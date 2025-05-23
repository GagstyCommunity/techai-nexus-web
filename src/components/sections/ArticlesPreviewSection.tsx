
import React from 'react';
import { Button } from '@/components/ui/button';

const ArticlesPreviewSection = () => {
  return (
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
  );
};

export default ArticlesPreviewSection;
