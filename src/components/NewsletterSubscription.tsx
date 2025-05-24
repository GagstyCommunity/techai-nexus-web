
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface NewsletterData {
  email: string;
  preferences: string[];
  source: string;
}

const NewsletterSubscription = ({ inline = false }: { inline?: boolean }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<string[]>(['general']);
  const { toast } = useToast();

  const subscriptionOptions = [
    { id: 'general', label: 'General Updates', description: 'Company news and announcements' },
    { id: 'ai-insights', label: 'AI Insights', description: 'Latest AI trends and tools' },
    { id: 'web3-news', label: 'Web3 News', description: 'Blockchain and crypto updates' },
    { id: 'tech-tips', label: 'Tech Tips', description: 'Development tips and tutorials' },
    { id: 'case-studies', label: 'Case Studies', description: 'Success stories and client work' },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      // Store subscription in database using raw SQL since types aren't updated yet
      const { error } = await supabase.rpc('create_newsletter_subscription', {
        p_email: email,
        p_preferences: preferences,
        p_source: inline ? 'inline-widget' : 'newsletter-page'
      });

      if (error) {
        // Fallback to direct insert if RPC doesn't exist
        const { error: insertError } = await supabase
          .from('newsletter_subscriptions' as any)
          .insert({
            email,
            preferences,
            source: inline ? 'inline-widget' : 'newsletter-page',
            status: 'active',
            subscribed_at: new Date().toISOString(),
          });

        if (insertError) throw insertError;
      }

      setIsSubscribed(true);
      
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest updates and insights.",
      });

      // Reset form after delay
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
      
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePreference = (prefId: string) => {
    setPreferences(prev => 
      prev.includes(prefId) 
        ? prev.filter(p => p !== prefId)
        : [...prev, prefId]
    );
  };

  if (inline) {
    return (
      <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 text-accent mr-2" />
            <h3 className="text-lg font-semibold">Stay Updated</h3>
          </div>
          
          {isSubscribed ? (
            <div className="flex items-center text-green-600">
              <Check className="w-5 h-5 mr-2" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="w-6 h-6 mr-2 text-accent" />
          Newsletter Subscription
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isSubscribed ? (
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Successfully Subscribed!</h3>
            <p className="text-gray-600">Check your email for a welcome message.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
              
              <div className="space-y-3">
                <label className="text-sm font-medium">Subscription Preferences:</label>
                {subscriptionOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id={option.id}
                      checked={preferences.includes(option.id)}
                      onChange={() => togglePreference(option.id)}
                      className="mt-1"
                    />
                    <div>
                      <label htmlFor={option.id} className="text-sm font-medium cursor-pointer">
                        {option.label}
                      </label>
                      <p className="text-xs text-gray-500">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
              </Button>
            </form>
            
            <p className="text-xs text-gray-500 text-center">
              You can unsubscribe at any time. We respect your privacy.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsletterSubscription;
