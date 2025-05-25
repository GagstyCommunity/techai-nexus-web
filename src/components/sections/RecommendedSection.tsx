
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RecommendedSection = () => {
  const recommendations = [
    {
      title: "AI Automation Starter Kit",
      description: "Perfect for small businesses looking to automate their first workflow",
      category: "AI Automation",
      price: "$2,500"
    },
    {
      title: "Web3 DeFi Protocol",
      description: "Launch your own DeFi protocol with our proven framework",
      category: "Web3",
      price: "$15,000"
    },
    {
      title: "SaaS MVP Package",
      description: "Get your SaaS idea to market in 4-6 weeks",
      category: "Development",
      price: "$8,000"
    }
  ];

  return (
    <section className="py-24 bg-gray-900/50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Recommended <span className="gradient-text">For You</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Based on current market trends and client success stories, these solutions deliver the highest ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((item, index) => (
            <Card key={index} className="bg-gray-800/70 border-gray-700/50 hover:border-accent/50 transition-all duration-300 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-sm text-accent font-medium mb-2">{item.category}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">{item.price}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-accent/30 text-accent hover:bg-accent hover:text-white"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedSection;
