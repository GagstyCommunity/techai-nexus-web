
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  features: string[];
  technologies: string[];
  content: any;
  pricing_info: any;
  featured_image: string;
  meta_title: string;
  meta_description: string;
}

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) {
        setError('No service specified');
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) {
          console.error('Supabase error:', error);
          // Fall back to default service data based on slug
          const defaultService = getDefaultServiceBySlug(slug);
          if (defaultService) {
            setService(defaultService);
            setError('Using default service data (database unavailable)');
          } else {
            setError('Service not found');
          }
        } else {
          setService(data);
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        // Fall back to default service data
        const defaultService = getDefaultServiceBySlug(slug);
        if (defaultService) {
          setService(defaultService);
          setError('Using default service data (network error)');
        } else {
          setError('Service not found');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  const getDefaultServiceBySlug = (slug: string): Service | null => {
    const defaultServices: Record<string, Service> = {
      'ai-tools': {
        id: '1',
        title: "AI Tool Development",
        slug: "ai-tools",
        description: "We specialize in creating custom AI solutions that transform how businesses operate. Our AI tools are designed to integrate seamlessly with your existing workflows, providing intelligent automation and insights that drive real results.",
        short_description: "Custom AI solutions, chatbots, and intelligent automation tools tailored to your business needs.",
        features: [
          "Custom AI Models trained on your data",
          "Intelligent Chatbot Development",
          "Machine Learning Integration",
          "AI Strategy Consulting",
          "Natural Language Processing",
          "Computer Vision Solutions"
        ],
        technologies: ["OpenAI", "TensorFlow", "PyTorch", "Hugging Face", "LangChain", "Python", "Node.js"],
        content: {},
        pricing_info: {},
        featured_image: "",
        meta_title: "AI Tool Development Services - Custom AI Solutions",
        meta_description: "Professional AI tool development services. Custom chatbots, machine learning models, and intelligent automation solutions."
      },
      'ai-automation': {
        id: '2',
        title: "AI Automation",
        slug: "ai-automation",
        description: "Streamline your business processes with intelligent automation. We help you identify repetitive tasks and transform them into automated workflows that save time, reduce errors, and scale your operations efficiently.",
        short_description: "Streamline your workflows with intelligent automation for SaaS, CRM, and business processes.",
        features: [
          "Process Automation & Optimization",
          "Lead Generation Automation",
          "CRM Integration & Management",
          "Workflow Optimization",
          "Data Processing Automation",
          "Customer Support Automation"
        ],
        technologies: ["n8n", "Zapier", "Make.com", "Python", "Node.js", "Airtable", "OpenAI API"],
        content: {},
        pricing_info: {},
        featured_image: "",
        meta_title: "AI Automation Services - Intelligent Business Process Automation",
        meta_description: "Professional AI automation services to streamline your business processes and increase efficiency."
      },
      'web3': {
        id: '3',
        title: "Web3 Development",
        slug: "web3",
        description: "Build the future with our comprehensive Web3 development services. From smart contracts to decentralized applications, we help you leverage blockchain technology to create innovative solutions.",
        short_description: "Blockchain games, DeFi protocols, and decentralized applications on Polkadot, Solana, and more.",
        features: [
          "Smart Contract Development",
          "DeFi Protocol Creation",
          "NFT Platform Development",
          "Blockchain Game Development",
          "DAO Implementation",
          "Cross-chain Solutions"
        ],
        technologies: ["Solidity", "Rust", "Web3.js", "Ethers.js", "React", "Node.js", "IPFS"],
        content: {},
        pricing_info: {},
        featured_image: "",
        meta_title: "Web3 Development Services - Blockchain & DeFi Solutions",
        meta_description: "Professional Web3 development services. Smart contracts, DeFi protocols, and blockchain applications."
      },
      'web-development': {
        id: '4',
        title: "Website & App Development",
        slug: "web-development",
        description: "Create powerful web applications and mobile apps that engage users and drive business growth. Our development team uses modern technologies to build scalable, performant solutions.",
        short_description: "High-performance websites and mobile apps that convert visitors into customers.",
        features: [
          "Custom Web Development",
          "E-commerce Solutions",
          "Mobile App Development",
          "Progressive Web Apps",
          "API Development",
          "Database Design"
        ],
        technologies: ["React", "Next.js", "Node.js", "TypeScript", "React Native", "PostgreSQL"],
        content: {},
        pricing_info: {},
        featured_image: "",
        meta_title: "Web & Mobile App Development Services",
        meta_description: "Professional web and mobile app development services using modern technologies."
      },
      'growth-hacking': {
        id: '5',
        title: "Growth Hacking & Marketing",
        slug: "growth-hacking",
        description: "Accelerate your business growth with data-driven marketing strategies. We specialize in growth hacking techniques for Web3, AI, and SaaS companies.",
        short_description: "Data-driven marketing strategies for Web3, AI, and SaaS companies to accelerate growth.",
        features: [
          "Digital Marketing Strategy",
          "SEO Optimization",
          "Conversion Rate Optimization",
          "Analytics & Reporting",
          "Content Marketing",
          "Social Media Marketing"
        ],
        technologies: ["Google Analytics", "SEMrush", "Hotjar", "A/B Testing Tools", "Marketing Automation"],
        content: {},
        pricing_info: {},
        featured_image: "",
        meta_title: "Growth Hacking & Digital Marketing Services",
        meta_description: "Data-driven growth hacking and marketing services to accelerate your business growth."
      },
      'devops': {
        id: '6',
        title: "DevOps & Infrastructure",
        slug: "devops",
        description: "Build reliable, scalable infrastructure with modern DevOps practices. We help you implement CI/CD pipelines, cloud migration, and infrastructure automation.",
        short_description: "Scalable cloud infrastructure on AWS, Azure, and modern DevOps practices for reliability.",
        features: [
          "Cloud Migration Services",
          "CI/CD Pipeline Setup",
          "Infrastructure as Code",
          "Security Implementation",
          "Monitoring & Logging",
          "Performance Optimization"
        ],
        technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "Jenkins", "Monitoring Tools"],
        content: {},
        pricing_info: {},
        featured_image: "",
        meta_title: "DevOps & Cloud Infrastructure Services",
        meta_description: "Professional DevOps and cloud infrastructure services for scalable, reliable applications."
      }
    };

    return defaultServices[slug] || null;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white">Loading service details...</div>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
            <p className="text-gray-300 mb-8">The service you're looking for doesn't exist.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={service.meta_title || service.title}
      description={service.meta_description || service.short_description}
    >
      {error && (
        <div className="bg-yellow-900/20 border border-yellow-700 text-yellow-300 px-4 py-2 text-sm text-center">
          {error}
        </div>
      )}
      
      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {service.short_description}
            </p>
            <Button 
              onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">About This Service</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Technologies & Pricing */}
            <div className="space-y-8">
              {/* Technologies */}
              {service.technologies && service.technologies.length > 0 && (
                <Card className="bg-white/5 border-gray-700/30">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Technologies We Use</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* CTA Card */}
              <Card className="bg-gradient-to-br from-accent/10 to-accent-hover/10 border-accent/30">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-4">Ready to Get Started?</h3>
                  <p className="text-gray-300 mb-6">
                    Let's discuss your project and see how we can help you achieve your goals.
                  </p>
                  <Button 
                    onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
                    className="btn-primary w-full"
                  >
                    Book Free Consultation
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

export default ServiceDetail;
