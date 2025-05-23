
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: "AI Tool Development",
      description: "Custom AI tools and applications that automate complex tasks and improve efficiency.",
      icon: "🤖",
      href: "/services/ai-tools",
      features: ["Custom AI Models", "API Integration", "Performance Optimization"]
    },
    {
      title: "AI Automation",
      description: "SaaS automation, lead generation, and intelligent workflow systems.",
      icon: "⚡",
      href: "/services/ai-automation",
      features: ["Lead Automation", "CRM Integration", "Smart Workflows"]
    },
    {
      title: "Web3 Development",
      description: "Blockchain games, Polkadot projects, Solana applications, and DeFi solutions.",
      icon: "🔗",
      href: "/services/web3",
      features: ["Smart Contracts", "DApps", "Token Development"]
    },
    {
      title: "Website & App Development",
      description: "Modern web applications, mobile apps, and progressive web applications.",
      icon: "💻",
      href: "/services/web-development",
      features: ["React/Next.js", "Mobile Apps", "PWAs"]
    },
    {
      title: "Growth Hacking & Marketing",
      description: "Web3, AI, and SaaS marketing strategies that drive exponential growth.",
      icon: "📈",
      href: "/services/growth-hacking",
      features: ["Digital Marketing", "Growth Strategy", "Analytics"]
    },
    {
      title: "DevOps & Infrastructure",
      description: "AWS, Azure, and cloud infrastructure setup, monitoring, and optimization.",
      icon: "☁️",
      href: "/services/devops",
      features: ["Cloud Setup", "CI/CD", "Monitoring"]
    },
    {
      title: "UI/UX & SaaS MVPs",
      description: "User-centered design and rapid MVP development for SaaS products.",
      icon: "🎨",
      href: "/services/ui-ux",
      features: ["User Research", "Design Systems", "MVP Development"]
    },
    {
      title: "Launch Lab for Startups",
      description: "Complete bundled solution from idea to market launch.",
      icon: "🚀",
      href: "/services/launch-lab",
      features: ["Strategy", "Development", "Launch Support"]
    }
  ];

  return (
    <Layout
      title="Services - TechAI Labs | AI, Web3, Development Solutions"
      description="End-to-end tech services including AI automation, Web3 development, growth hacking, and more. Transform your business with our expert team."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 hover:border-accent transition-all duration-300 group">
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-400">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={service.href}
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
  );
};

export default Services;
