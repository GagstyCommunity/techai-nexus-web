
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  description: string;
  industry: string;
  featured_image: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  read_time: number;
}

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedCaseStudies, setRelatedCaseStudies] = useState<CaseStudy[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
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

        // Fetch related content
        await fetchRelatedContent(slug);
      } catch (error) {
        console.error('Error fetching service:', error);
        const defaultService = getDefaultServiceBySlug(slug);
        if (defaultService) {
          setService(defaultService);
          setError('Using default service data (network error)');
        } else {
          setError('Service not found');
        }
        await fetchRelatedContent(slug);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  const fetchRelatedContent = async (serviceSlug: string) => {
    // Set default related content based on service type
    setRelatedCaseStudies(getDefaultCaseStudies(serviceSlug));
    setRelatedArticles(getDefaultArticles(serviceSlug));
    setRelatedServices(getDefaultRelatedServices(serviceSlug));
  };

  const getDefaultServiceBySlug = (slug: string): Service | null => {
    const defaultServices: Record<string, Service> = {
      'ai-automation': {
        id: '1',
        title: "Automate Your Business with AI",
        slug: "ai-automation",
        description: "Transform manual processes into intelligent, automated workflows that save time, reduce costs, and scale your operations effortlessly. Our AI automation solutions integrate seamlessly with your existing systems to deliver measurable results.",
        short_description: "Streamline your workflows with intelligent automation for SaaS, CRM, and business processes.",
        features: [
          "Lead Generation Bots - Automatically capture and qualify leads 24/7",
          "CRM Automation - Sync data, update records, and trigger actions automatically",
          "Data Scraping & Analysis - Extract insights from web data at scale",
          "Email Outreach Automation - Personalized campaigns that convert",
          "Customer Support AI - Intelligent chatbots that resolve issues instantly",
          "Sales Process Automation - Streamline your entire sales funnel"
        ],
        technologies: ["n8n", "Zapier", "OpenAI", "Python", "Make.com", "Airtable", "Node.js", "Custom AI Models"],
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

  const getDefaultCaseStudies = (serviceSlug: string): CaseStudy[] => {
    const caseStudyMap: Record<string, CaseStudy[]> = {
      'ai-automation': [
        {
          id: '1',
          title: "E-commerce AI Automation",
          slug: "ecommerce-ai-automation", 
          description: "Automated customer support and inventory management resulting in 85% reduction in support tickets",
          industry: "E-commerce",
          featured_image: ""
        },
        {
          id: '2',
          title: "SaaS Lead Generation Automation",
          slug: "saas-lead-generation",
          description: "Intelligent lead scoring system increased qualified leads by 300%",
          industry: "SaaS", 
          featured_image: ""
        }
      ]
    };
    return caseStudyMap[serviceSlug] || [];
  };

  const getDefaultArticles = (serviceSlug: string): Article[] => {
    const articleMap: Record<string, Article[]> = {
      'ai-automation': [
        {
          id: '1',
          title: "Complete Guide to AI Business Automation",
          slug: "ai-business-automation-guide",
          excerpt: "Learn how to identify automation opportunities and implement AI solutions that deliver ROI",
          featured_image: "",
          read_time: 8
        },
        {
          id: '2', 
          title: "ROI Calculator: AI Automation for Your Business",
          slug: "ai-automation-roi-calculator",
          excerpt: "Calculate potential savings and returns from implementing AI automation in your workflows",
          featured_image: "",
          read_time: 5
        }
      ]
    };
    return articleMap[serviceSlug] || [];
  };

  const getDefaultRelatedServices = (serviceSlug: string): Service[] => {
    const allServices = [
      { id: '1', title: "AI Tool Development", slug: "ai-tools", description: "Custom AI solutions and chatbots", short_description: "", features: [], technologies: [], content: {}, pricing_info: {}, featured_image: "", meta_title: "", meta_description: "" },
      { id: '2', title: "Web3 Development", slug: "web3", description: "Blockchain and DeFi solutions", short_description: "", features: [], technologies: [], content: {}, pricing_info: {}, featured_image: "", meta_title: "", meta_description: "" },
      { id: '3', title: "Website & App Development", slug: "web-development", description: "Modern web and mobile applications", short_description: "", features: [], technologies: [], content: {}, pricing_info: {}, featured_image: "", meta_title: "", meta_description: "" },
      { id: '4', title: "DevOps & Infrastructure", slug: "devops", description: "Scalable cloud infrastructure", short_description: "", features: [], technologies: [], content: {}, pricing_info: {}, featured_image: "", meta_title: "", meta_description: "" }
    ];
    
    return allServices.filter(s => s.slug !== serviceSlug).slice(0, 3);
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

  const benefits = [
    "Reduce manual tasks by up to 85%",
    "24/7 automated customer support", 
    "Increase lead generation by 300%",
    "Improve data accuracy by eliminating human error",
    "Scale operations without proportional staff increases",
    "Real-time analytics and reporting"
  ];

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
      
      {/* Service Intro Hero */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {service.description}
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

      {/* What's Included */}
      <section className="py-16">
        <div className="section-container">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
            What's <span className="gradient-text">Included</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700/30 hover:border-accent/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-2xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 bg-gray-900/30">
        <div className="section-container">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
            Why It <span className="gradient-text">Matters</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span className="text-gray-300 text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Tech We Use */}
      <section className="py-16">
        <div className="section-container">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
            Tools & Tech <span className="gradient-text">We Use</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {service.technologies.map((tech, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700/30 hover:border-accent/50 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <span className="text-white font-medium text-sm">{tech}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Work / Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-16 bg-gray-900/30">
          <div className="section-container">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              Related <span className="gradient-text">Work</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedCaseStudies.map((caseStudy) => (
                <Card key={caseStudy.id} className="bg-gray-800/50 border-gray-700/30 hover:border-accent/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30 mb-4">
                      {caseStudy.industry}
                    </Badge>
                    <h3 className="text-xl font-bold text-white mb-3">{caseStudy.title}</h3>
                    <p className="text-gray-300 mb-4">{caseStudy.description}</p>
                    <Link 
                      to={`/case-studies/${caseStudy.slug}`}
                      className="text-accent hover:text-orange-400 transition-colors font-medium"
                    >
                      View Case Study →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16">
          <div className="section-container">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              Related <span className="gradient-text">Services</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService) => (
                <Card key={relatedService.id} className="bg-gray-800/50 border-gray-700/30 hover:border-accent/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">{relatedService.title}</h3>
                    <p className="text-gray-300 mb-4">{relatedService.description}</p>
                    <Link 
                      to={`/services/${relatedService.slug}`}
                      className="text-accent hover:text-orange-400 transition-colors font-medium"
                    >
                      Learn More →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles That Go Deeper */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-900/30">
          <div className="section-container">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              Articles That Go <span className="gradient-text">Deeper</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((article) => (
                <Card key={article.id} className="bg-gray-800/50 border-gray-700/30 hover:border-accent/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">{article.title}</h3>
                      <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                        {article.read_time} min read
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-4">{article.excerpt}</p>
                    <Link 
                      to={`/articles/${article.slug}`}
                      className="text-accent hover:text-orange-400 transition-colors font-medium"
                    >
                      Read Article →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a free consultation to discuss your project requirements and explore how we can help you achieve your goals.
          </p>
          <Button 
            onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
            className="btn-primary text-lg px-8 py-4"
          >
            Book Free Consultation
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
