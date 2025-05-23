
import React from 'react';

const AIAutomationSection = () => {
  return (
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
  );
};

export default AIAutomationSection;
