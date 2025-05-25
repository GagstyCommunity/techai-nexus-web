
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke('create-newsletter-subscription', {
        body: { email, source: 'website' }
      });

      if (error) throw error;

      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail('');
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Please try again later or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="section-container">
        <Card className="max-w-2xl mx-auto bg-gray-800/70 border-gray-700/50 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with <span className="gradient-text">TechAI Labs</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Get the latest insights on AI automation, Web3 development, and tech innovation 
              delivered directly to your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-accent"
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-accent hover:bg-accent-hover text-white px-6"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            
            <p className="text-sm text-gray-400 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
