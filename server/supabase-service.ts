interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}

interface SupabaseResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export class SupabaseService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = process.env.VITE_SUPABASE_URL || 'https://qzfcefvusjzdzseokdla.supabase.co';
    this.apiKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6ZmNlZnZ1c2p6ZHpzZW9rZGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MzMzMTAsImV4cCI6MjA2NjMwOTMxMH0.BAUV_j3vGgtJbOI42YueJxbYOI7JNmgV-0ZsKh80dGU';
  }

  async submitContact(data: ContactSubmission): Promise<SupabaseResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/functions/v1/contact-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'apikey': this.apiKey,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit contact form');
      }

      return {
        success: true,
        message: 'Contact form submitted successfully',
        data: result,
      };
    } catch (error) {
      console.error('Supabase contact submission error:', error);
      return {
        success: false,
        message: 'Failed to submit contact form',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async handleElevenLabsRedirect(action: string): Promise<SupabaseResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/functions/v1/elevenlabs-redirect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'apikey': this.apiKey,
        },
        body: JSON.stringify({ action }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to handle redirect');
      }

      return {
        success: true,
        message: 'Redirect handled successfully',
        data: result,
      };
    } catch (error) {
      console.error('ElevenLabs redirect error:', error);
      return {
        success: false,
        message: 'Failed to handle redirect',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const supabaseService = new SupabaseService();
