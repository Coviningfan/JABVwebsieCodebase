// client/src/contact.tsx
import { useState, useEffect } from 'react'; // Añadido useEffect
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertContactSchema, type InsertContact } from '@shared/schema';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { initializeWebhookListener } from '../elevenlabs-redirect-to-form'; // Añadida importación

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
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
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
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  // Initialize ElevenLabs webhook listener
  useEffect(() => {
    initializeWebhookListener(); // Start the webhook listener
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-relaxed">
              Let's Build
              <span className="gradient-text block mt-2">Something Amazing</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Ready to transform your vision into reality? Get in touch with our expert team in Reno, Nevada.
            </p>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-600/20 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full animate-float" style={{animationDelay: '-2s'}}></div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-neutral-800/80 to-black/40 backdrop-blur-xl p-8 rounded-3xl border border-neutral-700/50 shadow-2xl">
              <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Send us a message
              </h3>
              
              {showSuccess ? (
                <div className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-400 text-2xl mr-4"></i>
                    <div>
                      <p className="text-green-400 font-semibold text-lg mb-1">
                        Message Sent Successfully!
                      </p>
                      <p className="text-green-300/80">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </div>
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
                          <FormLabel className="text-gray-300 text-sm font-medium">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500/20 rounded-xl h-12 backdrop-blur-sm"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 text-sm font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="john@example.com" 
                              className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500/20 rounded-xl h-12 backdrop-blur-sm"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 text-sm font-medium">Project Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-black/50 border-gray-600/50 text-white focus:border-red-500 focus:ring-red-500/20 rounded-xl h-12 backdrop-blur-sm">
                                <SelectValue placeholder="Select a service..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-black/95 border-gray-600 backdrop-blur-xl">
                              <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                              <SelectItem value="website">Interactive Website</SelectItem>
                              <SelectItem value="redesign">Website Redesign</SelectItem>
                              <SelectItem value="consultation">Consultation</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 text-sm font-medium">Project Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project, timeline, and goals..."
                              className="bg-black/50 border-gray-600/50 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500/20 resize-none min-h-[140px] rounded-xl backdrop-blur-sm"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={contactMutation.isPending}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-red-500/25 border-0"
                    >
                      {contactMutation.isPending ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Get In Touch
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-gradient-to-r from-neutral-800/50 to-transparent rounded-2xl backdrop-blur-sm border border-neutral-700/30">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <i className="fas fa-phone text-white text-lg"></i>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Phone</p>
                      <a href="tel:+1-775-800-5850" className="text-white hover:text-red-400 transition-colors duration-200 font-medium text-lg">
                        +1 (775) 800-5850
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gradient-to-r from-neutral-800/50 to-transparent rounded-2xl backdrop-blur-sm border border-neutral-700/30">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <i className="fas fa-envelope text-white text-lg"></i>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <a href="mailto:contact@jabvlabs.com" className="text-white hover:text-red-400 transition-colors duration-200 font-medium text-lg">
                        contact@jabvlabs.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gradient-to-r from-neutral-800/50 to-transparent rounded-2xl backdrop-blur-sm border border-neutral-700/30">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <i className="fas fa-map-marker-alt text-white text-lg"></i>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Location</p>
                      <p className="text-white font-medium text-lg">Reno, Nevada, USA</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Business Hours */}
              <div className="bg-gradient-to-br from-neutral-800/60 to-black/40 p-8 rounded-3xl backdrop-blur-xl border border-neutral-700/50 shadow-2xl">
                <h4 className="text-2xl font-bold mb-6 text-white">Business Hours</h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-red-400">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="font-medium">Saturday</span>
                    <span className="text-red-400">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
              </div>
              
              {/* Response Time */}
              <div className="bg-gradient-to-r from-red-600/20 via-red-500/10 to-transparent p-8 rounded-3xl backdrop-blur-xl border border-red-500/20">
                <div className="flex items-center mb-4">
                  <i className="fas fa-clock text-red-400 text-2xl mr-3"></i>
                  <h4 className="text-2xl font-bold text-white">Quick Response Guarantee</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  We respond to all inquiries within 24 hours. For urgent projects, call us directly for immediate assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
