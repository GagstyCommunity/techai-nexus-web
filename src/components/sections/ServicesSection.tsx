
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesSection = () => {
  const services = [
    {
      title: "AI Tool Development",
      description: "Custom AI solutions, chatbots, and intelligent automation tools tailored to your business needs.",
      icon: "🤖",
      href: "/services/ai-tools",
      features: ["Custom AI Models", "Chatbot Development", "ML Integration", "AI Consulting"]
    },
    {
      title: "AI Automation",
      description: "Streamline your workflows with intelligent automation for SaaS, CRM, and business processes.",
      icon: "⚡",
      href: "/services/ai-automation",
      features: ["Process Automation", "Lead Generation", "CRM Integration", "Workflow Optimization"]
    },
    {
      title: "Web3 Development",
      description: "Blockchain games, DeFi protocols, and decentralized applications on Polkadot, Solana, and more.",
      icon: "🌐",
      href: "/services/web3",
      features: ["Smart Contracts", "DeFi Protocols", "NFT Platforms", "Blockchain Games"]
    },
    {
      title: "Website & App Development",
      description: "High-performance websites and mobile apps that convert visitors into customers.",
      icon: "💻",
      href: "/services/web-development",
      features: ["Custom Development", "E-commerce", "Mobile Apps", "Progressive Web Apps"]
    },
    {
      title: "Growth Hacking & Marketing",
      description: "Data-driven marketing strategies for Web3, AI, and SaaS companies to accelerate growth.",
      icon: "📈",
      href: "/services/growth-hacking",
      features: ["Digital Marketing", "SEO Optimization", "Conversion Optimization", "Analytics"]
    },
    {
      title: "DevOps & Infrastructure",
      description: "Scalable cloud infrastructure on AWS, Azure, and modern DevOps practices for reliability.",
      icon: "🔧",
      href: "/services/devops",
      features: ["Cloud Migration", "CI/CD Pipelines", "Infrastructure as Code", "Security"]
    }
  ];

  return (
    <section className="py-24 bg-techGray-900/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Core Services</span>
          </h2>
          <p className="text-xl text-techGray-300 max-w-3xl mx-auto">
            Comprehensive tech solutions designed to accelerate your business growth and digital transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} to={service.href} className="group">
              <Card className="bg-techGray-800/50 border-techGray-700 hover:border-accent transition-all duration-300 transform group-hover:scale-105 h-full">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-white text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-techGray-300">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-techGray-400 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <span className="text-accent group-hover:text-accent-hover transition-colors inline-flex items-center">
                      Learn More
                      <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
