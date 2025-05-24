
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  description: string;
  challenge: string;
  solution: string;
  results: any;
  technologies: string[];
  industry: string;
  featured_image: string;
  meta_title: string;
  meta_description: string;
}

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          setCaseStudies(getDefaultCaseStudies());
          setError('Using default case studies (database unavailable)');
        } else {
          setCaseStudies(data || getDefaultCaseStudies());
        }
      } catch (error) {
        console.error('Error fetching case studies:', error);
        setCaseStudies(getDefaultCaseStudies());
        setError('Using default case studies (network error)');
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const getDefaultCaseStudies = (): CaseStudy[] => [
    {
      id: '1',
      title: 'AI-Powered Customer Service Automation',
      slug: 'ai-customer-service-automation',
      client_name: 'TechCorp Inc.',
      description: 'Implementing AI automation to transform customer service operations',
      challenge: 'Manual customer service processes leading to long response times and inconsistent service quality',
      solution: 'Developed an AI-powered automation system with chatbots and intelligent routing',
      results: {
        response_time: '85% reduction',
        customer_satisfaction: '95% positive',
        cost_savings: '60% reduction in operational costs'
      },
      technologies: ['OpenAI', 'Python', 'Node.js', 'React'],
      industry: 'Technology',
      featured_image: '',
      meta_title: 'AI Customer Service Automation Case Study',
      meta_description: 'How we helped TechCorp reduce response times by 85% with AI automation'
    },
    {
      id: '2',
      title: 'Web3 Marketplace Development',
      slug: 'web3-marketplace-development',
      client_name: 'CryptoTrade Ltd',
      description: 'Building a decentralized marketplace for digital assets',
      challenge: 'Need for a secure, scalable platform for trading digital assets',
      solution: 'Created a Web3-powered marketplace with smart contracts and user-friendly interface',
      results: {
        transactions: '100,000+ monthly',
        user_growth: '300% in first quarter',
        platform_security: 'Zero security incidents'
      },
      technologies: ['Solidity', 'React', 'Node.js', 'Web3.js'],
      industry: 'Blockchain',
      featured_image: '',
      meta_title: 'Web3 Marketplace Development Case Study',
      meta_description: 'How we built a secure Web3 marketplace handling 100,000+ monthly transactions'
    },
    {
      id: '3',
      title: 'SaaS Platform Scaling with AI',
      slug: 'saas-platform-scaling',
      client_name: 'GrowthTech Solutions',
      description: 'Scaling a SaaS platform to handle 10x user growth with AI automation',
      challenge: 'Rapid user growth overwhelming manual processes and support systems',
      solution: 'Implemented AI-driven automation for onboarding, support, and user management',
      results: {
        user_capacity: '10x increase',
        automation_rate: '90% of processes automated',
        support_efficiency: '75% faster resolution times'
      },
      technologies: ['OpenAI', 'Python', 'PostgreSQL', 'React', 'AWS'],
      industry: 'SaaS',
      featured_image: '',
      meta_title: 'SaaS Platform Scaling Case Study',
      meta_description: 'How we helped GrowthTech scale their platform to handle 10x more users'
    }
  ];

  return (
    <Layout
      title="Case Studies - TechAI Labs Success Stories"
      description="Explore our client success stories and see how we've helped businesses transform with AI, Web3, and modern technology solutions."
    >
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-gray-900 to-primary"></div>
        <div className="relative section-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Client <span className="gradient-text">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover how we've helped businesses transform their operations and achieve 
              remarkable results with our technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24">
        <div className="section-container">
          {error && (
            <div className="text-center py-4 mb-8">
              <div className="text-yellow-400 text-sm">{error}</div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl text-white">Loading case studies...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudies.map((caseStudy) => (
                <Card key={caseStudy.id} className="bg-gray-800/50 border-gray-700 hover:border-accent transition-all duration-300 group h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary" className="bg-accent/20 text-accent">
                        {caseStudy.industry}
                      </Badge>
                      <span className="text-gray-400 text-sm">{caseStudy.client_name}</span>
                    </div>
                    <CardTitle className="text-white text-xl mb-2 group-hover:text-accent transition-colors">
                      {caseStudy.title}
                    </CardTitle>
                    <p className="text-gray-300 text-sm">
                      {caseStudy.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Challenge */}
                      <div>
                        <h4 className="text-white font-semibold mb-2">Challenge:</h4>
                        <p className="text-gray-400 text-sm">{caseStudy.challenge}</p>
                      </div>

                      {/* Results */}
                      {caseStudy.results && (
                        <div>
                          <h4 className="text-white font-semibold mb-2">Key Results:</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {Object.entries(caseStudy.results).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm capitalize">
                                  {key.replace('_', ' ')}:
                                </span>
                                <span className="text-accent font-semibold text-sm">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies */}
                      {caseStudy.technologies && (
                        <div>
                          <h4 className="text-white font-semibold mb-2">Technologies:</h4>
                          <div className="flex flex-wrap gap-1">
                            {caseStudy.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4">
                        <Link 
                          to={`/case-studies/${caseStudy.slug}`}
                          className="inline-flex items-center text-accent hover:text-orange-400 transition-colors font-medium text-sm"
                        >
                          Read Full Case Study
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900/30">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a solution that drives real results for your business.
          </p>
          <Button 
            onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
            className="btn-primary text-lg px-8 py-4"
          >
            Start Your Project
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;
