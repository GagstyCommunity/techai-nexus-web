
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useSEO } from '@/hooks/useSEO';
import { useToolLogger } from '@/hooks/useToolLogger';
import SEOOptimizer from '@/components/SEOOptimizer';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { seoData } = useSEO('services');
  
  useToolLogger('services_page', 'view');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('status', 'published')
          .order('sort_order', { ascending: true });

        if (error) {
          console.error('Supabase error:', error);
          // Fall back to default services if database fails
          setServices(getDefaultServices());
        } else {
          setServices(data || getDefaultServices());
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fall back to default services if fetch fails
        setServices(getDefaultServices());
        setError('Failed to load services from database, showing default services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getDefaultServices = () => [
    {
      id: '1',
      title: "AI Tool Development",
      slug: "ai-tools",
      description: "Custom AI solutions, chatbots, and intelligent automation tools tailored to your business needs.",
      short_description: "Custom AI solutions, chatbots, and intelligent automation tools tailored to your business needs.",
      icon: "🤖",
      features: ["Custom AI Models", "Chatbot Development", "ML Integration", "AI Consulting"],
      status: "published"
    },
    {
      id: '2',
      title: "AI Automation",
      slug: "ai-automation",
      description: "Streamline your workflows with intelligent automation for SaaS, CRM, and business processes.",
      short_description: "Streamline your workflows with intelligent automation for SaaS, CRM, and business processes.",
      icon: "⚡",
      features: ["Process Automation", "Lead Generation", "CRM Integration", "Workflow Optimization"],
      status: "published"
    },
    {
      id: '3',
      title: "Web3 Development",
      slug: "web3",
      description: "Blockchain games, DeFi protocols, and decentralized applications on Polkadot, Solana, and more.",
      short_description: "Blockchain games, DeFi protocols, and decentralized applications on Polkadot, Solana, and more.",
      icon: "🌐",
      features: ["Smart Contracts", "DeFi Protocols", "NFT Platforms", "Blockchain Games"],
      status: "published"
    },
    {
      id: '4',
      title: "Website & App Development",
      slug: "web-development",
      description: "High-performance websites and mobile apps that convert visitors into customers.",
      short_description: "High-performance websites and mobile apps that convert visitors into customers.",
      icon: "💻",
      features: ["Custom Development", "E-commerce", "Mobile Apps", "Progressive Web Apps"],
      status: "published"
    },
    {
      id: '5',
      title: "Growth Hacking & Marketing",
      slug: "growth-hacking",
      description: "Data-driven marketing strategies for Web3, AI, and SaaS companies to accelerate growth.",
      short_description: "Data-driven marketing strategies for Web3, AI, and SaaS companies to accelerate growth.",
      icon: "📈",
      features: ["Digital Marketing", "SEO Optimization", "Conversion Optimization", "Analytics"],
      status: "published"
    },
    {
      id: '6',
      title: "DevOps & Infrastructure",
      slug: "devops",
      description: "Scalable cloud infrastructure on AWS, Azure, and modern DevOps practices for reliability.",
      short_description: "Scalable cloud infrastructure on AWS, Azure, and modern DevOps practices for reliability.",
      icon: "🔧",
      features: ["Cloud Migration", "CI/CD Pipelines", "Infrastructure as Code", "Security"],
      status: "published"
    }
  ];

  const defaultSEO = {
    title: "Services - TechAI Labs | AI, Web3, Development Solutions",
    description: "End-to-end tech services including AI automation, Web3 development, growth hacking, and more. Transform your business with our expert team.",
    keywords: ["AI automation", "Web3 development", "tech services", "software development"]
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
                End-to-End Tech That{' '}
                <span className="gradient-text">Scales Your Business</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                From AI automation to Web3 development, we provide comprehensive technology solutions 
                that drive real results and accelerate your growth.
              </p>
              <Button 
                onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
                className="btn-primary text-lg px-8 py-4"
              >
                Book Discovery Call
              </Button>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="section-container">
            {error && (
              <div className="text-center py-4 mb-8">
                <div className="text-yellow-400 text-sm">{error}</div>
              </div>
            )}
            
            {loading ? (
              <div className="text-center py-12">
                <div className="text-xl text-white">Loading services...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service: any, index) => (
                  <div key={service.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 hover:border-accent transition-all duration-300 group">
                    <div className="text-4xl mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-300 mb-6">{service.short_description || service.description}</p>
                    
                    {service.features && (
                      <ul className="space-y-2 mb-8">
                        {service.features.slice(0, 3).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center text-gray-400">
                            <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <Link 
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center text-accent hover:text-orange-400 transition-colors font-medium"
                    >
                      Learn More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gray-900/30">
          <div className="section-container text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Book a discovery call to discuss your project and learn how we can help you achieve your goals.
            </p>
            <Button 
              onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
              className="btn-primary text-lg px-8 py-4"
            >
              Book Discovery Call
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Services;
