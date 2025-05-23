
import React from 'react';
import { Button } from '@/components/ui/button';

const FeaturedCaseStudySection = () => {
  return (
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
  );
};

export default FeaturedCaseStudySection;
