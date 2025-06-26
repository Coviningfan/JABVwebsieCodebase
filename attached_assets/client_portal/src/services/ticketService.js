import { supabase } from '../utils/supabase';

const ticketService = {
  // Get all support tickets for the current user
  getTickets: async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('support_tickets')
        .select(`
          *,
          clients!inner(
            user_profiles!inner(id)
          )
        `)
        .eq('clients.user_profiles.id', user.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch support tickets' };
    }
  },

  // Create a new support ticket
  createTicket: async (ticketData) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      // First get the client record
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', user.user.id)
        .single();

      if (clientError || !client) {
        return { success: false, error: 'Client record not found' };
      }

      const { data, error } = await supabase
        .from('support_tickets')
        .insert({
          ...ticketData,
          client_id: client.id,
          status: 'open'
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to create support ticket' };
    }
  },

  // Get ticket statistics
  getTicketStats: async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('support_tickets')
        .select(`
          status,
          priority,
          clients!inner(
            user_profiles!inner(id)
          )
        `)
        .eq('clients.user_profiles.id', user.user.id);

      if (error) {
        return { success: false, error: error.message };
      }

      const stats = {
        total: data.length,
        open: data.filter(t => t.status === 'open').length,
        in_progress: data.filter(t => t.status === 'in_progress').length,
        resolved: data.filter(t => t.status === 'resolved').length,
        high_priority: data.filter(t => t.priority === 'high').length
      };

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Failed to fetch ticket statistics' };
    }
  }
};

export default ticketService;