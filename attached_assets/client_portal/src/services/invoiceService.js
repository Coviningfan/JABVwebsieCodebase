import { supabase } from '../utils/supabase';

const invoiceService = {
  // Get all invoices for the current user
  getInvoices: async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          projects(
            name,
            clients!inner(
              user_profiles!inner(id)
            )
          )
        `)
        .eq('projects.clients.user_profiles.id', user.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch invoices' };
    }
  },

  // Get invoice statistics
  getInvoiceStats: async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('invoices')
        .select(`
          status,
          amount,
          projects!inner(
            clients!inner(
              user_profiles!inner(id)
            )
          )
        `)
        .eq('projects.clients.user_profiles.id', user.user.id);

      if (error) {
        return { success: false, error: error.message };
      }

      const stats = {
        total: data.length,
        pending: data.filter(i => i.status === 'pending').length,
        paid: data.filter(i => i.status === 'paid').length,
        overdue: data.filter(i => i.status === 'overdue').length,
        totalAmount: data.reduce((sum, i) => sum + (i.amount || 0), 0),
        paidAmount: data.filter(i => i.status === 'paid').reduce((sum, i) => sum + (i.amount || 0), 0)
      };

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Failed to fetch invoice statistics' };
    }
  }
};

export default invoiceService;