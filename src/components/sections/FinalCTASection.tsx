
import React from 'react';
import { Button } from '@/components/ui/button';

const FinalCTASection = () => {
  return (
    <section className="py-24">
      <div className="section-container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-techGray-300 mb-8">
            Book a free strategy call and discover how our end-to-end tech solutions can accelerate your growth.
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 mb-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Free Strategy Call Includes:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              {[
                "Complete tech audit of your current setup",
                "Custom roadmap for your specific goals",
                "ROI projections and timeline estimates",
                "Technology recommendations and best practices"
              ].map((item, index) => (
                <div key={index} className="flex items-center text-gray-200">
                  <span className="w-3 h-3 bg-accent rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-sm">{item}</span>
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
  );
};

export default FinalCTASection;
