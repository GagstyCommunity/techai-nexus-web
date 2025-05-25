
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth = ({ children }: AdminAuthProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const { toast } = useToast();

  // Demo credentials for testing
  const demoCredentials = {
    email: 'admin@techailabs.com',
    password: 'admin123456'
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      // For demo purposes, allow simple credential check
      if (email === demoCredentials.email && password === demoCredentials.password) {
        // Create a mock user session for demo
        setUser({ 
          id: 'demo-admin', 
          email: demoCredentials.email, 
          role: 'admin' 
        });
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in to the admin panel.",
        });
        return;
      }

      // Try Supabase auth
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // If Supabase fails, show demo credentials
        toast({
          title: "Authentication Error",
          description: `${error.message}. Try demo credentials: ${demoCredentials.email} / ${demoCredentials.password}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error", 
        description: `Network error. Try demo credentials: ${demoCredentials.email} / ${demoCredentials.password}`,
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  const fillDemoCredentials = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-lg text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">TechAI Labs Admin</CardTitle>
            <CardDescription className="text-gray-300">
              Sign in to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <h4 className="font-medium text-accent mb-2">Demo Credentials</h4>
              <p className="text-sm text-gray-300 mb-2">
                Email: {demoCredentials.email}<br />
                Password: {demoCredentials.password}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fillDemoCredentials}
                className="w-full border-accent/30 text-accent hover:bg-accent hover:text-white"
              >
                Use Demo Credentials
              </Button>
            </div>
            
            <form onSubmit={handleAuth} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-accent"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-accent"
              />
              <Button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white" disabled={authLoading}>
                {authLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center border-b border-gray-700">
        <span>Welcome, {user.email}</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSignOut}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Sign Out
        </Button>
      </div>
      <div className="bg-primary min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default AdminAuth;
