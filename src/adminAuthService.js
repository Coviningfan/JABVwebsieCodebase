import { supabase } from './database.js';

class AdminAuthService {
  constructor() {
    this.currentAdmin = null;
    this.isAuthenticated = false;
  }

  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      const { data: adminProfile, error: profileError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError || !adminProfile) {
        await supabase.auth.signOut();
        throw new Error('Unauthorized: Admin access required');
      }

      this.currentAdmin = { ...data.user, profile: adminProfile };
      this.isAuthenticated = true;

      return { success: true, admin: this.currentAdmin };
    } catch (error) {
      console.error('Admin sign in error:', error);
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      this.currentAdmin = null;
      this.isAuthenticated = false;

      return { success: true };
    } catch (error) {
      console.error('Admin sign out error:', error);
      return { success: false, error: error.message };
    }
  }

  async getCurrentAdmin() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: adminProfile, error: profileError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError || !adminProfile) {
          this.currentAdmin = null;
          this.isAuthenticated = false;
          return null;
        }

        this.currentAdmin = { ...user, profile: adminProfile };
        this.isAuthenticated = true;
      } else {
        this.currentAdmin = null;
        this.isAuthenticated = false;
      }

      return this.currentAdmin;
    } catch (error) {
      console.error('Get current admin error:', error);
      this.currentAdmin = null;
      this.isAuthenticated = false;
      return null;
    }
  }

  isAdminAuthenticated() {
    return this.isAuthenticated && this.currentAdmin && this.currentAdmin.profile;
  }

  getAdminPermissions() {
    if (!this.currentAdmin || !this.currentAdmin.profile) {
      return {};
    }
    return this.currentAdmin.profile.permissions || {};
  }

  hasPermission(permission) {
    const permissions = this.getAdminPermissions();
    return permissions[permission] === true;
  }

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        this.currentAdmin = null;
        this.isAuthenticated = false;
        callback(null);
      } else if (event === 'SIGNED_IN' && session?.user) {
        const admin = await this.getCurrentAdmin();
        callback(admin);
      }
    });
  }
}

export const adminAuthService = new AdminAuthService();
