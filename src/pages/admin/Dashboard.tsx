
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const [stats, setStats] = useState({
    pages: 0,
    services: 0,
    solutions: 0,
    caseStudies: 0,
    articles: 0,
    testimonials: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [pages, services, solutions, caseStudies, articles, testimonials] = await Promise.all([
        supabase.from('pages').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('solutions').select('id', { count: 'exact' }),
        supabase.from('case_studies').select('id', { count: 'exact' }),
        supabase.from('articles').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }),
      ]);

      setStats({
        pages: pages.count || 0,
        services: services.count || 0,
        solutions: solutions.count || 0,
        caseStudies: caseStudies.count || 0,
        articles: articles.count || 0,
        testimonials: testimonials.count || 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Pages', value: stats.pages, description: 'Total pages' },
    { title: 'Services', value: stats.services, description: 'Service offerings' },
    { title: 'Solutions', value: stats.solutions, description: 'Solution packages' },
    { title: 'Case Studies', value: stats.caseStudies, description: 'Client showcases' },
    { title: 'Articles', value: stats.articles, description: 'Blog posts' },
    { title: 'Testimonials', value: stats.testimonials, description: 'Client reviews' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-300">Overview of your content management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">{stat.title}</CardDescription>
              <CardTitle className="text-3xl text-white">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription className="text-gray-400">Common tasks to manage your content</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/admin/services" className="p-4 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-accent transition-colors">
            <h3 className="font-medium text-white">Manage Services</h3>
            <p className="text-sm text-gray-400">Add, edit, or remove service offerings</p>
          </a>
          <a href="/admin/case-studies" className="p-4 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-accent transition-colors">
            <h3 className="font-medium text-white">Add Case Study</h3>
            <p className="text-sm text-gray-400">Showcase your latest client work</p>
          </a>
          <a href="/admin/articles" className="p-4 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-accent transition-colors">
            <h3 className="font-medium text-white">Write Article</h3>
            <p className="text-sm text-gray-400">Create new blog content</p>
          </a>
          <a href="/admin/seo-settings" className="p-4 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-accent transition-colors">
            <h3 className="font-medium text-white">SEO Settings</h3>
            <p className="text-sm text-gray-400">Optimize for search engines</p>
          </a>
          <a href="/admin/testimonials" className="p-4 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-accent transition-colors">
            <h3 className="font-medium text-white">Manage Testimonials</h3>
            <p className="text-sm text-gray-400">Add client feedback and reviews</p>
          </a>
          <a href="/admin/tool-logs" className="p-4 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-accent transition-colors">
            <h3 className="font-medium text-white">Analytics</h3>
            <p className="text-sm text-gray-400">View tool usage and metrics</p>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
