
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const About = () => {
  const team = [
    {
      name: "Alex Chen",
      role: "CEO & AI Strategist",
      image: "👨‍💼",
      bio: "10+ years in AI and automation, former tech lead at major SaaS companies."
    },
    {
      name: "Sarah Rodriguez",
      role: "CTO & Web3 Expert",
      image: "👩‍💻",
      bio: "Blockchain pioneer with 8+ years building DeFi and Web3 applications."
    },
    {
      name: "Mike Johnson",
      role: "Lead Developer",
      image: "👨‍💻",
      bio: "Full-stack expert specializing in scalable applications and DevOps."
    }
  ];

  const techStack = [
    "React/Next.js", "Python", "Node.js", "Solidity", "AWS", "Azure",
    "OpenAI", "n8n", "Zapier", "Supabase", "PostgreSQL", "Docker"
  ];

  const clients = [
    "🏢 Fortune 500 Companies",
    "🚀 Y Combinator Startups",
    "🏦 FinTech Leaders",
    "🎮 Gaming Studios",
    "💊 HealthTech Innovators",
    "🛒 E-commerce Platforms"
  ];

  return (
    <Layout
      title="About Us - TechAI Labs | Our Mission & Team"
      description="Learn about TechAI Labs' mission, expert team, and technology stack. We're passionate about building AI and Web3 solutions that transform businesses."
    >
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-gray-900 to-primary"></div>
        <div className="relative section-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Building the Future of{' '}
              <span className="gradient-text">Technology</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We're a team of passionate technologists dedicated to helping businesses 
              leverage AI, Web3, and cutting-edge technology to achieve exponential growth.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
              Our <span className="gradient-text">Mission</span>
            </h2>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-12 mb-16">
              <p className="text-xl text-gray-300 leading-relaxed">
                At TechAI Labs, we believe that every business deserves access to cutting-edge technology. 
                Our mission is to democratize AI, Web3, and advanced development capabilities by providing 
                end-to-end solutions that are both powerful and accessible. We don't just build technology; 
                we build partnerships that drive real, measurable results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Innovation First</h3>
                <p className="text-gray-400">
                  We stay ahead of technology trends to deliver solutions that give you a competitive edge.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-white mb-3">Partnership Approach</h3>
                <p className="text-gray-400">
                  We work as an extension of your team, understanding your business goals deeply.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-white mb-3">Results Driven</h3>
                <p className="text-gray-400">
                  Every solution we build is designed to deliver measurable business impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Meet Our <span className="gradient-text">Expert Team</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our diverse team brings together expertise in AI, Web3, development, and business strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center hover:border-accent transition-all duration-300">
                <div className="text-6xl mb-6">{member.image}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-accent font-medium mb-4">{member.role}</p>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Our <span className="gradient-text">Tech Stack</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We use the latest and most reliable technologies to build robust, scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center hover:border-accent transition-all duration-300">
                <span className="text-white font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-24 bg-gray-900/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Our <span className="gradient-text">Clients & Partners</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We're proud to work with innovative companies across various industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center">
                <span className="text-lg text-white">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Work with Us?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our expertise can help accelerate your business growth and innovation.
          </p>
          <Button 
            onClick={() => window.open('https://calendly.com/brain-techailabs/techailabs', '_blank')}
            className="btn-primary text-lg px-8 py-4"
          >
            Start a Conversation
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
