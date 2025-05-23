
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <Layout
      title="TechAI Labs - End-to-End Tech Solutions | AI, Web3, Development"
      description="Transform your business with AI automation, Web3 development, and custom tech solutions. Expert team delivering scalable results for startups and enterprises."
    >
      <HeroSection />
      <ServicesSection />
      <WhyChooseSection />
      
      {/* AI Automation in Action Section */}
      <section className="py-24 bg-techGray-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              AI Automation <span className="gradient-text">in Action</span>
            </h2>
            <p className="text-xl text-techGray-300 max-w-3xl mx-auto">
              See how our AI solutions transform business operations and drive measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Lead Generation Automation",
                description: "Automated lead scoring and nurturing increased qualified leads by 300%",
                metric: "+300% Leads",
                icon: "🎯"
              },
              {
                title: "Customer Support AI",
                description: "24/7 intelligent chatbot reduced response time by 85%",
                metric: "-85% Response Time",
                icon: "💬"
              },
              {
                title: "Sales Process Optimization",
                description: "AI-powered CRM automation boosted conversion rates by 150%",
                metric: "+150% Conversions",
                icon: "📊"
              }
            ].map((item, index) => (
              <div key={index} className="bg-techGray-800/50 border border-techGray-700 rounded-lg p-6 hover:border-accent transition-all duration-300">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-techGray-300 mb-4">{item.description}</p>
                <div className="text-accent font-bold text-lg">{item.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study Section */}
      <section className="py-24">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Featured <span className="gradient-text">Success Story</span>
            </h2>
            
            <div className="bg-gradient-to-r from-techGray-800/50 to-techGray-700/50 border border-techGray-600 rounded-2xl p-8 md:p-12">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  SaaS Platform Scales 10x with AI Automation
                </h3>
                <p className="text-lg text-techGray-300 mb-6">
                  A growing SaaS company needed to automate their customer onboarding and support processes to handle rapid user growth without proportional staff increases.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">10x</div>
                  <div className="text-techGray-400">User Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">75%</div>
                  <div className="text-techGray-400">Cost Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">2 weeks</div>
                  <div className="text-techGray-400">Implementation</div>
                </div>
              </div>
              
              <Button 
                onClick={() => window.location.href = '/case-studies'}
                className="btn-primary"
              >
                View Full Case Study
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Preview Section */}
      <section className="py-24 bg-techGray-900/30">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Latest <span className="gradient-text">Insights</span>
              </h2>
              <p className="text-xl text-techGray-300">
                Stay updated with the latest trends in AI, Web3, and technology.
              </p>
            </div>
            <Button 
              onClick={() => window.location.href = '/articles'}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 mt-6 md:mt-0"
            >
              View All Articles
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Future of AI in Business Automation",
                excerpt: "Discover how AI is revolutionizing business processes and what it means for your company's growth strategy.",
                readTime: "5 min read",
                category: "AI"
              },
              {
                title: "Web3 Development: Building the Decentralized Future",
                excerpt: "A comprehensive guide to Web3 technologies and how they're reshaping digital experiences.",
                readTime: "8 min read",
                category: "Web3"
              },
              {
                title: "Scaling SaaS with Intelligent Automation",
                excerpt: "Learn how smart automation can help your SaaS business scale efficiently while reducing operational costs.",
                readTime: "6 min read",
                category: "SaaS"
              }
            ].map((article, index) => (
              <div key={index} className="bg-techGray-800/50 border border-techGray-700 rounded-lg overflow-hidden hover:border-accent transition-all duration-300 cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-accent/20 to-accent-hover/20"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-accent text-sm font-medium">{article.category}</span>
                    <span className="text-techGray-400 text-sm">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{article.title}</h3>
                  <p className="text-techGray-300 mb-4">{article.excerpt}</p>
                  <span className="text-accent hover:text-accent-hover transition-colors inline-flex items-center">
                    Read More
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-techGray-300 mb-8">
              Book a free strategy call and discover how our end-to-end tech solutions can accelerate your growth.
            </p>
            
            <div className="bg-gradient-to-r from-accent/10 to-accent-hover/10 border border-accent/30 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Free Strategy Call Includes:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                {[
                  "Complete tech audit of your current setup",
                  "Custom roadmap for your specific goals",
                  "ROI projections and timeline estimates",
                  "Technology recommendations and best practices"
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-techGray-300">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
              className="btn-primary text-lg px-8 py-4"
            >
              Book Your Free Strategy Call
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
