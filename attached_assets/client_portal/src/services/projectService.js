import { supabase } from '../utils/supabase';

const projectService = {
  // Get all projects for the current user
  getProjects: async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          clients!inner(
            id,
            company_name,
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
      return { success: false, error: 'Failed to fetch projects' };
    }
  },

  // Get a specific project by ID
  getProject: async (projectId) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          clients!inner(
            id,
            company_name,
            user_profiles!inner(id)
          ),
          project_messages(
            id,
            content,
            created_at,
            sender_id,
            user_profiles(full_name, role)
          )
        `)
        .eq('id', projectId)
        .eq('clients.user_profiles.id', user.user.id)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch project details' };
    }
  },

  // Send a message for a project
  sendMessage: async (projectId, content) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('project_messages')
        .insert({
          project_id: projectId,
          sender_id: user.user.id,
          content: content
        })
        .select(`
          *,
          user_profiles(full_name, role)
        `)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to send message' };
    }
  },

  // Get project statistics
  getProjectStats: async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('projects')
        .select(`
          status,
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
        pending: data.filter(p => p.status === 'pending').length,
        in_progress: data.filter(p => p.status === 'in_progress').length,
        client_review: data.filter(p => p.status === 'client_review').length,
        completed: data.filter(p => p.status === 'completed').length
      };

      return { success: true, data: stats };
    } catch (error) {
      return { success: false, error: 'Failed to fetch project statistics' };
    }
  }
};

export default projectService;