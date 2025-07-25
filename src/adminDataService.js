import { supabase } from './database.js';
import { adminAuthService } from './adminAuthService.js';

class AdminDataService {
  constructor() {
    this.currentAdminId = null;
  }

  async init() {
    const admin = await adminAuthService.getCurrentAdmin();
    if (admin && admin.profile) {
      this.currentAdminId = admin.id;
    }
  }

  async createCustomer(customerData) {
    try {
      const { email, full_name, company_name, phone } = customerData;
      
      const verificationToken = crypto.randomUUID();
      
      const { data: customer, error: customerError } = await supabase
        .from('clients')
        .insert({
          email,
          full_name,
          company_name,
          phone,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (customerError) throw customerError;

      const { data: verification, error: verificationError } = await supabase
        .from('customer_verifications')
        .insert({
          email,
          verification_token: verificationToken,
          created_by: this.currentAdminId,
          status: 'pending'
        })
        .select()
        .single();

      if (verificationError) throw verificationError;

      return { 
        success: true, 
        customer, 
        verification_token: verificationToken 
      };
    } catch (error) {
      console.error('Create customer error:', error);
      return { success: false, error: error.message };
    }
  }

  async sendVerificationEmail(email, verificationToken) {
    try {
      const verificationUrl = `${window.location.origin}/verify/${verificationToken}`;
      
      console.log(`Verification email would be sent to ${email} with URL: ${verificationUrl}`);
      
      return { success: true, verification_url: verificationUrl };
    } catch (error) {
      console.error('Send verification email error:', error);
      return { success: false, error: error.message };
    }
  }

  async getCustomers() {
    try {
      const { data: customers, error } = await supabase
        .from('clients')
        .select(`
          *,
          customer_verifications(status, created_at, verified_at)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return customers || [];
    } catch (error) {
      console.error('Get customers error:', error);
      return [];
    }
  }

  async createProject(projectData) {
    try {
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single();

      if (projectError) throw projectError;

      if (projectData.client_id) {
        const { error: assignmentError } = await supabase
          .from('project_assignments')
          .insert({
            project_id: project.id,
            assigned_by: this.currentAdminId,
            assigned_to: projectData.client_id,
            access_level: projectData.access_level || 'full',
            demo_access: projectData.demo_access || false
          });

        if (assignmentError) throw assignmentError;
      }

      return { success: true, project };
    } catch (error) {
      console.error('Create project error:', error);
      return { success: false, error: error.message };
    }
  }

  async getProjects() {
    try {
      const { data: projects, error } = await supabase
        .from('projects')
        .select(`
          *,
          clients(full_name, company_name),
          project_assignments(access_level, demo_access, assigned_at)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return projects || [];
    } catch (error) {
      console.error('Get projects error:', error);
      return [];
    }
  }

  async updateCustomerVerification(token, status) {
    try {
      const { data, error } = await supabase
        .from('customer_verifications')
        .update({
          status,
          verified_at: status === 'verified' ? new Date().toISOString() : null
        })
        .eq('verification_token', token)
        .select()
        .single();

      if (error) throw error;
      return { success: true, verification: data };
    } catch (error) {
      console.error('Update verification error:', error);
      return { success: false, error: error.message };
    }
  }

  async getVerificationByToken(token) {
    try {
      const { data, error } = await supabase
        .from('customer_verifications')
        .select('*')
        .eq('verification_token', token)
        .single();

      if (error) throw error;
      return { success: true, verification: data };
    } catch (error) {
      console.error('Get verification error:', error);
      return { success: false, error: error.message };
    }
  }

  async updateProject(projectId, updates) {
    try {
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select()
        .single();

      if (projectError) throw projectError;

      return { success: true, project };
    } catch (error) {
      console.error('Update project error:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteCustomer(customerId) {
    try {
      await supabase
        .from('customer_verifications')
        .delete()
        .eq('email', (await supabase.from('clients').select('email').eq('id', customerId).single()).data.email);

      await supabase
        .from('project_assignments')
        .delete()
        .eq('assigned_to', customerId);

      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', customerId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Delete customer error:', error);
      return { success: false, error: error.message };
    }
  }

  async getDashboardStats() {
    try {
      const [customersResult, projectsResult] = await Promise.all([
        this.getCustomers(),
        this.getProjects()
      ]);

      const customers = customersResult;
      const projects = projectsResult;

      const verifiedCustomers = customers.filter(c => 
        c.customer_verifications?.[0]?.status === 'verified'
      ).length;

      const activeProjects = projects.filter(p => 
        p.status === 'in_progress' || p.status === 'active'
      ).length;

      return {
        totalCustomers: customers.length,
        verifiedCustomers,
        totalProjects: projects.length,
        activeProjects
      };
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      return {
        totalCustomers: 0,
        verifiedCustomers: 0,
        totalProjects: 0,
        activeProjects: 0
      };
    }
  }

  async resendVerificationEmail(customerId) {
    try {
      const { data: customer, error: customerError } = await supabase
        .from('clients')
        .select('email')
        .eq('id', customerId)
        .single();

      if (customerError) throw customerError;

      const { data: verification, error: verificationError } = await supabase
        .from('customer_verifications')
        .select('verification_token')
        .eq('email', customer.email)
        .eq('status', 'pending')
        .single();

      if (verificationError) throw verificationError;

      return await this.sendVerificationEmail(customer.email, verification.verification_token);
    } catch (error) {
      console.error('Resend verification error:', error);
      return { success: false, error: error.message };
    }
  }
}

export const adminDataService = new AdminDataService();
