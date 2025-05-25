
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, CheckCircle } from 'lucide-react';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email,
            source: 'website_footer',
            status: 'active',
            preferences: ['general'],
            subscribed_at: new Date().toISOString()
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubscribed(true);
        setEmail('');
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our newsletter",
        });
      }
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-gray-800 border border-accent p-8 rounded-lg text-center">
        <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
        <p className="text-gray-300">You've successfully subscribed to our newsletter.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border border-gray-700 p-8 rounded-lg">
      <div className="max-w-md mx-auto text-center">
        <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Stay Updated with TechAI Labs
        </h3>
        <p className="text-gray-300 mb-6">
          Get the latest insights on AI, automation, and tech innovations delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-accent focus:ring-accent"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-accent hover:bg-accent-hover text-white border-0 px-6 py-2 font-medium transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
        </form>
        
        <p className="text-xs text-gray-400 mt-3">
          No spam, unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
