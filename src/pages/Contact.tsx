
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const serviceTypes = [
    'AI Tool Development',
    'AI Automation',
    'Web3 Development',
    'Website & App Development',
    'Growth Hacking & Marketing',
    'DevOps & Infrastructure',
    'UI/UX & SaaS MVPs',
    'Launch Lab for Startups'
  ];

  const budgetRanges = [
    '$5K - $10K',
    '$10K - $25K',
    '$25K - $50K',
    '$50K - $100K',
    '$100K+'
  ];

  return (
    <Layout
      title="Contact Us - TechAI Labs | Get in Touch"
      description="Get in touch with TechAI Labs. Book a free consultation or contact us directly via email or WhatsApp. Let's discuss your tech project."
    >
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-gray-900 to-primary"></div>
        <div className="relative section-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get in Touch with a{' '}
              <span className="gradient-text">Real Human</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Ready to transform your business? Let's discuss your project and explore how we can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-300 mb-2">
                    Service Type *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2"
                  >
                    <option value="">Select a service</option>
                    {serviceTypes.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Tell us about your project, goals, and timeline..."
                  />
                </div>

                <Button type="submit" className="btn-primary w-full text-lg py-3">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info & Calendly */}
            <div className="space-y-8">
              {/* Direct Contact */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-accent mr-3">📧</span>
                    <a href="mailto:hello@techailabs.com" className="text-gray-300 hover:text-accent transition-colors">
                      hello@techailabs.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <span className="text-accent mr-3">💬</span>
                    <a 
                      href="https://wa.me/17534784140" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-accent transition-colors"
                    >
                      WhatsApp: +1 (753) 478-4140
                    </a>
                  </div>
                </div>
              </div>

              {/* Calendly Integration */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Book a Call Directly</h3>
                <p className="text-gray-300 mb-6">
                  Skip the form and book a free 30-minute strategy call to discuss your project in detail.
                </p>
                <Button 
                  onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
                  className="btn-primary w-full text-lg py-3"
                >
                  Book Free Strategy Call
                </Button>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-r from-accent/10 to-orange-400/10 border border-accent/30 rounded-lg p-6">
                <h4 className="text-xl font-bold text-white mb-3">Quick Response Guarantee</h4>
                <p className="text-gray-300">
                  We respond to all inquiries within 24 hours. For urgent matters, 
                  contact us directly via WhatsApp for immediate assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
