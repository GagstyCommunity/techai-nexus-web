import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ServiceTemplateProps {
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  process: {
    title: string;
    description: string;
  }[];
  pricing?: {
    title: string;
    price: string;
    features: string[];
  }[];
}

const ServiceTemplate: React.FC<ServiceTemplateProps> = ({
  title,
  description,
  features,
  benefits,
  technologies,
  process,
  pricing
}) => {
  return (
    <Layout
      title={`${title} - TechAI Labs | Expert Solutions`}
      description={description}
    >
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-gray-900 to-primary"></div>
        <div className="relative section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {title.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? 
                <span key={i} className="gradient-text">{word}</span> : 
                <span key={i}>{word} </span>
              )}
            </h1>
            <p className="text-xl text-gray-300 mb-8">{description}</p>
            <Button 
              onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
              className="btn-primary text-lg px-8 py-4"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="section-container">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
            Key <span className="gradient-text">Features</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-accent transition-all duration-300">
                <div className="text-2xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-900/30">
        <div className="section-container">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
            Key <span className="gradient-text">Benefits</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></span>
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="section-container">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
            Our <span className="gradient-text">Process</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <div className="text-3xl text-accent mb-4">{index + 1}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-gray-900/30">
        <div className="section-container">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
            Technologies <span className="gradient-text">We Use</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                <span className="text-white font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {pricing && (
        <section className="py-24">
          <div className="section-container">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
              Flexible <span className="gradient-text">Pricing</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricing.map((plan, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 hover:border-accent transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.title}</h3>
                  <div className="text-3xl font-bold text-accent mb-6">{plan.price}</div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book a free consultation to discuss your project requirements and explore how we can help.
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

export default ServiceTemplate;