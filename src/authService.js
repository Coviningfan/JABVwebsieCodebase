import { supabase } from './database.js';
import { demoUser } from './demoData.js';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.demoMode = true; // Enable demo mode for immediate testing
  }

  async signUp(email, password, userData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;

      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('clients')
          .insert({
            id: data.user.id,
            email,
            full_name: userData.full_name,
            company_name: userData.company,
            phone: userData.phone
          });

        if (profileError) throw profileError;
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    }
  }

  async signIn(email, password) {
    // Demo mode for immediate testing
    if (this.demoMode) {
      if (email === 'demo@jabvlabs.com' && password === 'demo123') {
        this.currentUser = demoUser;
        this.isAuthenticated = true;
        console.log('Demo authentication successful');
        return { success: true, user: demoUser };
      } else {
        return { success: false, error: 'Demo credentials: demo@jabvlabs.com / demo123' };
      }
    }

    // Real Supabase authentication
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('clients')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
      }

      this.currentUser = { ...data.user, profile };
      this.isAuthenticated = true;

      return { success: true, user: this.currentUser };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      this.currentUser = null;
      this.isAuthenticated = false;

      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('clients')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
        }

        this.currentUser = { ...user, profile };
        this.isAuthenticated = true;
      } else {
        this.currentUser = null;
        this.isAuthenticated = false;
      }

      return this.currentUser;
    } catch (error) {
      console.error('Get current user error:', error);
      this.currentUser = null;
      this.isAuthenticated = false;
      return null;
    }
  }

  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  }

  async updateProfile(updates) {
    try {
      if (!this.currentUser) throw new Error('No authenticated user');

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', this.currentUser.id);

      if (error) throw error;

      // Update local user data
      this.currentUser.profile = { ...this.currentUser.profile, ...updates };

      return { success: true, user: this.currentUser };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await this.getCurrentUser();
      } else if (event === 'SIGNED_OUT') {
        this.currentUser = null;
        this.isAuthenticated = false;
      }
      callback(event, session, this.currentUser);
    });
  }
}

export const authService = new AuthService();