
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AIAutomation = () => {
  const features = [
    "Lead Generation Bots",
    "CRM Automation",
    "Data Scraping",
    "Email Outreach",
    "Customer Support AI",
    "Sales Process Automation"
  ];

  const tools = [
    { name: "n8n", logo: "🔄" },
    { name: "Zapier", logo: "⚡" },
    { name: "OpenAI", logo: "🤖" },
    { name: "Python", logo: "🐍" },
    { name: "Make", logo: "🛠️" },
    { name: "Airtable", logo: "📊" }
  ];

  const relatedServices = [
    { name: "Web Development", href: "/services/web-development" },
    { name: "DevOps", href: "/services/devops" },
    { name: "Growth Hacking", href: "/services/growth-hacking" }
  ];

  return (
    <Layout
      title="AI Automation Services - TechAI Labs | Automate Your Business"
      description="Automate your business processes with AI. Lead generation, CRM automation, data scraping, and intelligent workflows that scale your operations."
    >
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-gray-900 to-primary"></div>
        <div className="relative section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Automate Your Business with{' '}
              <span className="gradient-text">AI</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Transform manual processes into intelligent, automated workflows that save time, 
              reduce costs, and scale your operations effortlessly.
            </p>
            <Button 
              onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
              className="btn-primary text-lg px-8 py-4"
            >
              Get Your Automation Strategy
            </Button>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              What's <span className="gradient-text">Included</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI automation solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center hover:border-accent transition-all duration-300">
                <div className="text-2xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature}</h3>
                <p className="text-gray-400">
                  Streamline your {feature.toLowerCase()} with intelligent automation.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-24 bg-gray-900/30">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              Why AI Automation <span className="gradient-text">Matters</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Pain Points Solved</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></span>
                    <span className="text-gray-300">Manual, repetitive tasks consuming valuable time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></span>
                    <span className="text-gray-300">Inconsistent lead follow-up and nurturing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></span>
                    <span className="text-gray-300">Limited scalability of current processes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></span>
                    <span className="text-gray-300">Data silos and disconnected systems</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Industry Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></span>
                    <span className="text-gray-300">300% increase in lead generation efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></span>
                    <span className="text-gray-300">85% reduction in manual data entry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></span>
                    <span className="text-gray-300">24/7 customer support automation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></span>
                    <span className="text-gray-300">Real-time analytics and reporting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Tech */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Tools & Tech <span className="gradient-text">We Use</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {tools.map((tool, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-accent transition-all duration-300">
                  <div className="text-3xl mb-3">{tool.logo}</div>
                  <div className="text-white font-medium">{tool.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-24 bg-gray-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Related <span className="gradient-text">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedServices.map((service, index) => (
              <Link 
                key={index}
                to={service.href}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-accent transition-all duration-300 block text-center"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{service.name}</h3>
                <span className="text-accent">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Let's Build Your Automation System
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to transform your business with AI automation? Book a free strategy call to get started.
          </p>
          <Button 
            onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
            className="btn-primary text-lg px-8 py-4"
          >
            Book Free Strategy Call
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default AIAutomation;
