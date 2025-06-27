import { createClient } from '@supabase/supabase-js';

// Extract project reference from environment variables
const rawUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY;

// Convert PostgreSQL URL to Supabase HTTP URL
let supabaseUrl;
if (rawUrl && rawUrl.includes('supabase.com')) {
  // Extract project reference from the URL
  const match = rawUrl.match(/([a-z0-9]+)\.pooler\.supabase\.com/);
  if (match) {
    const projectRef = match[1].split('.')[0];
    supabaseUrl = `https://${projectRef}.supabase.co`;
  } else {
    // Fallback to qzfcefvusjzdzseokdla project
    supabaseUrl = 'https://qzfcefvusjzdzseokdla.supabase.co';
  }
} else {
  supabaseUrl = 'https://qzfcefvusjzdzseokdla.supabase.co';
}

console.log('Supabase URL configured:', supabaseUrl);
console.log('Supabase Key loaded:', supabaseKey ? 'Yes' : 'No');

// Remove automatic test to avoid initialization issues

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Database helper functions
export const db = {
  // Users
  async getUser(id) {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserByEmail(email) {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Projects
  async getProjects(userId) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('client_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getProject(id) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Messages
  async getProjectMessages(projectId, limit = 50) {
    const { data, error } = await supabase
      .from('project_messages')
      .select(`
        *,
        users(name, email)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async sendMessage(projectId, userId, message, attachments = null) {
    const { data, error } = await supabase
      .from('project_messages')
      .insert({
        project_id: projectId,
        user_id: userId,
        message,
        attachments
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Activity
  async getRecentActivity(userId, limit = 20) {
    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      // If activity_log table doesn't exist, return empty array
      console.log('Activity log not available:', error);
      return [];
    }
    return data || [];
  },

  async logActivity(userId, projectId, activityType, description) {
    const { data, error } = await supabase
      .from('activity_log')
      .insert({
        user_id: userId,
        project_id: projectId,
        activity_type: activityType,
        description
      });
    
    if (error) throw error;
    return data;
  },

  // Files
  async getProjectFiles(projectId) {
    const { data, error } = await supabase
      .from('project_files')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async uploadFile(projectId, fileName, fileUrl, fileSize, fileType, uploadedBy) {
    const { data, error } = await supabase
      .from('project_files')
      .insert({
        project_id: projectId,
        file_name: fileName,
        file_url: fileUrl,
        file_size: fileSize,
        file_type: fileType,
        uploaded_by: uploadedBy
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};