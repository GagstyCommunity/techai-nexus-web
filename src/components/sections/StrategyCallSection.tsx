
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const StrategyCallSection = () => {
  const callIncludes = [
    "30-minute one-on-one consultation",
    "Technology stack recommendations",
    "Project timeline and budget estimate",
    "Custom solution roadmap",
    "Risk assessment and mitigation strategies",
    "Post-launch support planning"
  ];

  return (
    <section className="py-24 bg-gray-900/50">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Free Strategy Call <span className="gradient-text">Includes:</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get expert insights tailored to your specific business needs and challenges.
            </p>
            <Button 
              onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
              className="btn-primary text-lg px-8 py-4"
            >
              Book Your Strategy Call
            </Button>
          </div>
          
          <Card className="bg-gray-800/70 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <ul className="space-y-4">
                {callIncludes.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StrategyCallSection;
