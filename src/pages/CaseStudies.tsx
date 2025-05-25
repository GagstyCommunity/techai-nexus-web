
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useSEO } from '@/hooks/useSEO';
import { useToolLogger } from '@/hooks/useToolLogger';
import SEOOptimizer from '@/components/SEOOptimizer';

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  description: string;
  client_name: string;
  client_logo: string;
  industry: string;
  technologies: string[];
  featured_image: string;
  challenge: string;
  solution: string;
  results: any;
  status: string;
}

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { seoData } = useSEO('case-studies');
  
  useToolLogger('case_studies_page', 'view');

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
      title: "E-commerce AI Automation",
      slug: "ecommerce-ai-automation",
      description: "Automated customer support and inventory management for online retailer",
      client_name: "RetailTech Solutions",
      client_logo: "",
      industry: "E-commerce",
      technologies: ["OpenAI", "n8n", "Shopify API", "Python"],
      featured_image: "",
      challenge: "Manual customer support was overwhelming the team with 500+ daily inquiries",
      solution: "Implemented AI chatbot with inventory integration and automated order processing",
      results: {
        metrics: [
          "85% reduction in support tickets",
          "24/7 customer service availability",
          "40% increase in customer satisfaction"
        ]
      },
      status: "published"
    },
    {
      id: '2', 
      title: "SaaS Lead Generation Automation",
      slug: "saas-lead-generation",
      description: "Automated lead qualification and nurturing system for B2B SaaS company",
      client_name: "CloudSync Pro",
      client_logo: "",
      industry: "SaaS",
      technologies: ["Zapier", "HubSpot API", "OpenAI", "Airtable"],
      featured_image: "",
      challenge: "Low conversion rates and manual lead qualification process",
      solution: "Built intelligent lead scoring system with automated email sequences",
      results: {
        metrics: [
          "300% increase in qualified leads",
          "60% reduction in sales cycle",
          "2x improvement in conversion rates"
        ]
      },
      status: "published"
    },
    {
      id: '3',
      title: "DeFi Protocol Development", 
      slug: "defi-protocol-development",
      description: "Custom DeFi yield farming protocol on Ethereum",
      client_name: "YieldMax Finance",
      client_logo: "",
      industry: "DeFi",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum"],
      featured_image: "",
      challenge: "Complex yield farming strategies needed automation and security",
      solution: "Developed smart contracts with automated yield optimization",
      results: {
        metrics: [
          "$10M+ TVL achieved",
          "99.9% uptime maintained",
          "50+ integrations completed"
        ]
      },
      status: "published"
    }
  ];

  const defaultSEO = {
    title: "Case Studies - TechAI Labs | Success Stories & Results",
    description: "Explore our client success stories and see how we've helped businesses achieve their goals with AI automation, Web3 development, and more.",
    keywords: ["case studies", "client success", "AI automation results", "Web3 projects"]
  };

  return (
    <>
      <SEOOptimizer
        title={seoData?.meta_title || defaultSEO.title}
        description={seoData?.meta_description || defaultSEO.description}
        keywords={seoData?.meta_keywords || defaultSEO.keywords}
        ogTitle={seoData?.og_title}
        ogDescription={seoData?.og_description}
        ogImage={seoData?.og_image}
        twitterTitle={seoData?.twitter_title}
        twitterDescription={seoData?.twitter_description}
        twitterImage={seoData?.twitter_image}
        canonicalUrl={seoData?.canonical_url}
        robots={seoData?.robots_directive}
        structuredData={seoData?.structured_data}
      />
      
      <Layout
        title={seoData?.meta_title || defaultSEO.title}
        description={seoData?.meta_description || defaultSEO.description}
      >
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-gray-900 to-primary"></div>
          <div className="relative section-container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Success Stories That{' '}
                <span className="gradient-text">Speak for Themselves</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover how we've helped businesses transform their operations and achieve remarkable results through innovative technology solutions.
              </p>
              <Button 
                onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Your Success Story
              </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies.map((caseStudy) => (
                  <Card key={caseStudy.id} className="bg-gray-800/50 border-gray-700/30 hover:border-accent/50 transition-all duration-300 group">
                    <CardContent className="p-0">
                      {caseStudy.featured_image && (
                        <div className="aspect-video bg-gray-700 rounded-t-lg mb-6"></div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                            {caseStudy.industry}
                          </Badge>
                          {caseStudy.client_name && (
                            <span className="text-sm text-gray-400">{caseStudy.client_name}</span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                          {caseStudy.title}
                        </h3>
                        
                        <p className="text-gray-300 mb-4">
                          {caseStudy.description}
                        </p>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-white mb-2">Challenge:</h4>
                          <p className="text-sm text-gray-400">{caseStudy.challenge}</p>
                        </div>

                        {caseStudy.results?.metrics && (
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-white mb-2">Results:</h4>
                            <ul className="space-y-1">
                              {caseStudy.results.metrics.map((metric: string, index: number) => (
                                <li key={index} className="text-sm text-accent flex items-start">
                                  <span className="w-1 h-1 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  {metric}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                          <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                              {caseStudy.technologies.slice(0, 3).map((tech, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                                  {tech}
                                </Badge>
                              ))}
                              {caseStudy.technologies.length > 3 && (
                                <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                                  +{caseStudy.technologies.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        <Button 
                          variant="outline" 
                          className="w-full border-accent/30 text-accent hover:bg-accent hover:text-white"
                          onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
                        >
                          Get Similar Results
                        </Button>
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
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and explore how we can help you achieve similar results.
            </p>
            <Button 
              onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
              className="btn-primary text-lg px-8 py-4"
            >
              Book Strategy Call
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CaseStudies;
