
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-techGray-900 to-primary"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FF6A00\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative section-container py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            End-to-End Tech That{' '}
            <span className="gradient-text">Scales Your Business</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-techGray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
            From AI automation to Web3 development, we build cutting-edge solutions that drive real results. 
            Transform your business with technology that works.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button 
              onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
              className="btn-primary text-lg px-8 py-4"
            >
              Book Free Strategy Call
            </Button>
            <Button 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 text-lg px-8 py-4"
            >
              View Our Work
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-techGray-400">Projects Delivered</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-accent mb-2">98%</div>
              <div className="text-techGray-400">Client Satisfaction</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-techGray-400">Support Available</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-accent mb-2">5+</div>
              <div className="text-techGray-400">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
