
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Solutions = () => {
  const solutions = [
    {
      title: "SaaS Automation Suite",
      description: "Complete automation ecosystem for SaaS businesses including lead generation, customer onboarding, and retention workflows.",
      icon: "⚡",
      features: ["Lead Scoring", "Automated Onboarding", "Churn Prevention", "Analytics Dashboard"],
      href: "/solutions/saas-automation"
    },
    {
      title: "E-commerce Growth Package",
      description: "End-to-end solution for online stores including AI-powered recommendations, inventory management, and marketing automation.",
      icon: "🛒",
      features: ["Product Recommendations", "Inventory AI", "Email Automation", "Customer Analytics"],
      href: "/solutions/ecommerce-growth"
    },
    {
      title: "Web3 Startup Launcher",
      description: "Complete Web3 ecosystem including token development, DApp creation, and community management tools.",
      icon: "🚀",
      features: ["Token Creation", "Smart Contracts", "DApp Development", "Community Tools"],
      href: "/solutions/web3-launcher"
    },
    {
      title: "AI-First Business Stack",
      description: "Transform traditional businesses with AI automation, predictive analytics, and intelligent decision-making systems.",
      icon: "🤖",
      features: ["Process Automation", "Predictive Analytics", "AI Insights", "Decision Support"],
      href: "/solutions/ai-business-stack"
    },
    {
      title: "Startup MVP Builder",
      description: "Rapid prototyping and MVP development for startups, from idea validation to market launch.",
      icon: "💡",
      features: ["Rapid Prototyping", "User Testing", "Market Validation", "Launch Support"],
      href: "/solutions/startup-mvp"
    },
    {
      title: "Enterprise Digital Transformation",
      description: "Comprehensive digital transformation for large organizations including legacy system modernization and AI integration.",
      icon: "🏢",
      features: ["Legacy Modernization", "System Integration", "AI Implementation", "Change Management"],
      href: "/solutions/enterprise-transformation"
    }
  ];

  return (
    <Layout
      title="Solutions - TechAI Labs | Business-Ready Tech Solutions"
      description="Discover our comprehensive business solutions including SaaS automation, Web3 development, AI integration, and digital transformation packages."
    >
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-gray-900 to-primary"></div>
        <div className="relative section-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Business-Ready{' '}
              <span className="gradient-text">Solutions</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Complete technology packages designed for specific business needs. 
              From SaaS automation to Web3 development, we have the right solution for your industry.
            </p>
            <Button 
              onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
              className="btn-primary text-lg px-8 py-4"
            >
              Explore Solutions
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 hover:border-accent transition-all duration-300 group">
                <div className="text-4xl mb-6">{solution.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
                <p className="text-gray-300 mb-6">{solution.description}</p>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-3">Includes:</h4>
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-400">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  to={solution.href}
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

      {/* Why Choose Our Solutions */}
      <section className="py-24 bg-gray-900/30">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
              Why Choose Our <span className="gradient-text">Solutions</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Industry-Specific</h3>
                <p className="text-gray-400">
                  Solutions tailored to your industry's unique challenges and requirements.
                </p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-3">Rapid Deployment</h3>
                <p className="text-gray-400">
                  Pre-built components and proven frameworks for faster time to market.
                </p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
                <div className="text-3xl mb-4">🔧</div>
                <h3 className="text-xl font-bold text-white mb-3">Fully Customizable</h3>
                <p className="text-gray-400">
                  Adaptable solutions that grow and evolve with your business needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a free consultation to discuss which solution is right for your business.
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

export default Solutions;
