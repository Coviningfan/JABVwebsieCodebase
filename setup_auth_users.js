// Setup script to create authenticated users in Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qzfcefvusjzdzseokdla.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key needed

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTestUsers() {
  console.log('Creating test users...')
  
  // User 1: John Smith
  try {
    const { data: user1, error: error1 } = await supabase.auth.admin.createUser({
      email: 'john@example.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: {
        full_name: 'John Smith',
        company_name: 'Tech Corp'
      }
    })
    
    if (error1) {
      console.error('Error creating user 1:', error1)
    } else {
      console.log('✓ Created user john@example.com:', user1.user.id)
      
      // Update the clients table with the correct auth user ID
      const { error: updateError1 } = await supabase
        .from('clients')
        .update({ id: user1.user.id })
        .eq('email', 'john@example.com')
      
      if (updateError1) {
        console.error('Error updating client 1:', updateError1)
      } else {
        console.log('✓ Updated client record for john@example.com')
      }
    }
  } catch (err) {
    console.error('Failed to create user 1:', err)
  }
  
  // User 2: Sarah Johnson
  try {
    const { data: user2, error: error2 } = await supabase.auth.admin.createUser({
      email: 'sarah@example.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: {
        full_name: 'Sarah Johnson',
        company_name: 'Design Studio'
      }
    })
    
    if (error2) {
      console.error('Error creating user 2:', error2)
    } else {
      console.log('✓ Created user sarah@example.com:', user2.user.id)
      
      // Update the clients table with the correct auth user ID
      const { error: updateError2 } = await supabase
        .from('clients')
        .update({ id: user2.user.id })
        .eq('email', 'sarah@example.com')
      
      if (updateError2) {
        console.error('Error updating client 2:', updateError2)
      } else {
        console.log('✓ Updated client record for sarah@example.com')
      }
    }
  } catch (err) {
    console.error('Failed to create user 2:', err)
  }
}

createTestUsers()