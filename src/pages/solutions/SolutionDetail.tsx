
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface Solution {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  features: string[];
  benefits: string[];
  target_audience: string[];
  content: any;
  featured_image: string;
  meta_title: string;
  meta_description: string;
}

const SolutionDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolution = async () => {
      if (!slug) return;
      
      try {
        const { data, error } = await supabase
          .from('solutions')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;
        setSolution(data);
      } catch (error) {
        console.error('Error fetching solution:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolution();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!solution) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Solution Not Found</h1>
            <p className="text-gray-300 mb-8">The solution you're looking for doesn't exist.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={solution.meta_title || solution.title}
      description={solution.meta_description || solution.short_description}
    >
      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {solution.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {solution.short_description}
            </p>
            <Button 
              onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
              className="btn-primary text-lg px-8 py-4"
            >
              Get This Solution
            </Button>
          </div>
        </div>
      </section>

      {/* Solution Details */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Solution Overview</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {solution.description}
              </p>

              {/* Features */}
              {solution.features && solution.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {solution.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Benefits & Target Audience */}
            <div className="space-y-8">
              {/* Benefits */}
              {solution.benefits && solution.benefits.length > 0 && (
                <Card className="bg-white/5 border-gray-700/30">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Benefits</h3>
                    <ul className="space-y-3">
                      {solution.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Target Audience */}
              {solution.target_audience && solution.target_audience.length > 0 && (
                <Card className="bg-white/5 border-gray-700/30">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Perfect For</h3>
                    <div className="flex flex-wrap gap-2">
                      {solution.target_audience.map((audience, index) => (
                        <Badge key={index} variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                          {audience}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CTA Card */}
              <Card className="bg-gradient-to-br from-accent/10 to-accent-hover/10 border-accent/30">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-4">Ready to Implement?</h3>
                  <p className="text-gray-300 mb-6">
                    Let's discuss how this solution can transform your business.
                  </p>
                  <Button 
                    onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
                    className="btn-primary w-full"
                  >
                    Schedule Discussion
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionDetail;
