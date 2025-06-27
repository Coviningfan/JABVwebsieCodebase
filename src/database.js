import { createClient } from '@supabase/supabase-js';

// Direct Supabase configuration
const supabaseUrl = 'https://qzfcefvusjzdzseokdla.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6ZmNlZnZ1c2p6ZHpzZW9rZGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MzQ0MDMsImV4cCI6MjA1MDMxMDQwM30.BqJd4nSNPmhKUz2GE5F-9vQpxkv6YR8aXQLa9G_GIrU';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Database helper functions
export const db = {
  // Users
  async getUser(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserByEmail(email) {
    const { data, error } = await supabase
      .from('users')
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
      .select(`
        *,
        project_members!inner(user_id)
      `)
      .eq('project_members.user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
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
      .select(`
        *,
        projects(name),
        users(name)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
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