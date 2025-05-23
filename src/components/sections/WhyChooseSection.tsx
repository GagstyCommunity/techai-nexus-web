
import React from 'react';

const WhyChooseSection = () => {
  const reasons = [
    {
      title: "Proven Expertise",
      description: "5+ years of experience delivering cutting-edge solutions across AI, Web3, and traditional development.",
      icon: "🏆"
    },
    {
      title: "End-to-End Solutions",
      description: "From strategy to deployment, we handle every aspect of your project with dedicated teams.",
      icon: "🔄"
    },
    {
      title: "Rapid Deployment",
      description: "Agile development methodology ensures faster time-to-market without compromising quality.",
      icon: "⚡"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock support and maintenance to keep your systems running smoothly.",
      icon: "🛡️"
    },
    {
      title: "Scalable Architecture",
      description: "Future-proof solutions built to scale with your business growth and evolving needs.",
      icon: "📈"
    },
    {
      title: "Transparent Process",
      description: "Regular updates, clear communication, and full visibility into project progress.",
      icon: "👁️"
    }
  ];

  const logos = [
    "OpenAI", "AWS", "Azure", "Polkadot", "Solana", "React", "Node.js", "Python"
  ];

  return (
    <section className="py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="gradient-text">TechAI Labs</span>
          </h2>
          <p className="text-xl text-techGray-300 max-w-3xl mx-auto">
            Trusted by startups and enterprises worldwide for delivering exceptional tech solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-techGray-800/30 border border-techGray-700 hover:border-accent transition-all duration-300">
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{reason.title}</h3>
              <p className="text-techGray-300">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold text-white mb-8">Trusted Technologies</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {logos.map((logo, index) => (
              <div key={index} className="px-4 py-2 bg-techGray-800/50 rounded-lg border border-techGray-700">
                <span className="text-techGray-300 font-medium">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
