import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import { insertContactSchema, type InsertContact } from '@shared/schema';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

// Initialize Supabase client
const supabaseUrl = 'https://qzfcefvusjzdzseokdla.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6ZmNlZnZ1c2p6ZHpzZW9rZGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MzMzMTAsImV4cCI6MjA2NjMwOTMxMH0.BAUV_j3vGgtJbOI42YueJxbYOI7JNmgV-0ZsKh80dGU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const { error } = await supabase
        .from('prospects')
        .insert([
          {
            full_name: data.name,
            email: data.email,
            project_type: data.projectType,
            project_details: data.message,
          },
        ]);

      if (error) throw new Error(error.message);
      return { success: true };
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Contact Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-neutral-800/80 to-black/40 backdrop-blur-xl p-8 rounded-3xl border border-neutral-700/50 shadow-2xl">
              <h3 className="text-3xl font-bold mb-8">Send us a message</h3>

              {showSuccess ? (
                <div className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-2xl">
                  <div>
                    <p className="text-green-400 font-semibold text-lg mb-1">
                      Message Sent Successfully!
                    </p>
                    <p className="text-green-300/80">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Mobile Web App Development">Mobile Web App Development</SelectItem>
                              <SelectItem value="Interactive Website">Interactive Website</SelectItem>
                              <SelectItem value="Website Redesign">Website Redesign</SelectItem>
                              <SelectItem value="Consultation">Consultation</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Details</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell us about your project, timeline, and goals..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </Form>
              )}
            </div>
            {/* You can add additional content here, such as contact info or a map */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

