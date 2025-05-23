
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminLayout = () => {
  const location = useLocation();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of the admin panel.",
    });
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/pages', label: 'Pages' },
    { href: '/admin/services', label: 'Services' },
    { href: '/admin/solutions', label: 'Solutions' },
    { href: '/admin/case-studies', label: 'Case Studies' },
    { href: '/admin/articles', label: 'Articles' },
    { href: '/admin/testimonials', label: 'Testimonials' },
    { href: '/admin/seo-settings', label: 'SEO Settings' },
    { href: '/admin/tool-logs', label: 'Tool Logs' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/admin" className="text-xl font-bold text-gray-900">
                TechAI Labs Admin
              </Link>
              <div className="hidden md:flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.href
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
                View Site
              </Link>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
