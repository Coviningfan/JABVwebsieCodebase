import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('SUPABASE_URL:', supabaseUrl);
  console.error('SERVICE_KEY available:', !!supabaseServiceKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;

    if (!adminEmail || !adminPassword || !adminName) {
      console.error('Missing required environment variables:');
      console.error('ADMIN_EMAIL:', !!adminEmail);
      console.error('ADMIN_PASSWORD:', !!adminPassword);
      console.error('ADMIN_NAME:', !!adminName);
      console.error('Please set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_NAME environment variables');
      process.exit(1);
    }

    console.log(`Creating ${adminName} admin user...`);

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: adminName,
        role: 'admin',
        is_admin: true
      }
    });

    if (authError) {
      console.error('Auth user creation error:', authError);
      return;
    }

    console.log('Auth user created:', authData.user.id);

    const { data: adminProfile, error: profileError } = await supabase
      .from('admin_users')
      .insert({
        id: authData.user.id,
        email: adminEmail,
        full_name: adminName,
        role: 'admin',
        permissions: {
          customer_create: true,
          project_manage: true,
          system_admin: true
        }
      })
      .select()
      .single();

    if (profileError) {
      console.error('Admin profile creation error:', profileError);
      return;
    }

    console.log('Admin user created successfully:', adminProfile);
    console.log('Login credentials: [ADMIN_EMAIL] / [ADMIN_PASSWORD]');

  } catch (error) {
    console.error('Setup error:', error);
  }
}

createAdminUser();
