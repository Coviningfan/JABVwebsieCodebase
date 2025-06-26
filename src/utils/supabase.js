import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qzfcefvusjzdzseokdla.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6ZmNlZnZ1c2p6ZHpzZW9rZGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NTcyMzMsImV4cCI6MjA1MDAzMzIzM30.BQ1v9SqJQUXjcjmAJbBmGOPPwPKqn1EWKuR7r-Q9CX4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);