
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI', 'Web3', 'Automation', 'Growth', 'Development', 'SaaS'];

  const articles = [
    {
      title: "The Future of AI in Business Automation",
      excerpt: "Discover how AI is revolutionizing business processes and what it means for your company's growth strategy.",
      category: "AI",
      readTime: "5 min read",
      date: "2024-01-15",
      featured: true
    },
    {
      title: "Web3 Development: Building the Decentralized Future",
      excerpt: "A comprehensive guide to Web3 technologies and how they're reshaping digital experiences.",
      category: "Web3",
      readTime: "8 min read",
      date: "2024-01-12",
      featured: true
    },
    {
      title: "Scaling SaaS with Intelligent Automation",
      excerpt: "Learn how smart automation can help your SaaS business scale efficiently while reducing operational costs.",
      category: "SaaS",
      readTime: "6 min read",
      date: "2024-01-10",
      featured: true
    },
    {
      title: "Growth Hacking for Web3 Startups",
      excerpt: "Proven strategies for acquiring and retaining users in the Web3 ecosystem.",
      category: "Growth",
      readTime: "7 min read",
      date: "2024-01-08",
      featured: false
    },
    {
      title: "Building AI Tools: From Concept to MVP",
      excerpt: "Step-by-step guide to developing and launching your first AI-powered tool.",
      category: "AI",
      readTime: "9 min read",
      date: "2024-01-05",
      featured: false
    },
    {
      title: "DevOps Best Practices for Modern Startups",
      excerpt: "Essential DevOps practices to ensure scalability and reliability from day one.",
      category: "Development",
      readTime: "6 min read",
      date: "2024-01-03",
      featured: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <Layout
      title="Articles - TechAI Labs | AI, Web3 & Tech Insights"
      description="Stay updated with the latest insights on AI, Web3, automation, and technology trends. Expert articles and guides from the TechAI Labs team."
    >
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-gray-900 to-primary"></div>
        <div className="relative section-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Tech <span className="gradient-text">Insights</span> & Articles
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Stay ahead of the curve with expert insights on AI, Web3, automation, 
              and the latest technology trends shaping the future.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={selectedCategory === category ? "btn-primary" : "border-gray-600 text-gray-300 hover:bg-gray-700"}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {selectedCategory === 'All' && !searchTerm && (
        <section className="py-16">
          <div className="section-container">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Featured <span className="gradient-text">Articles</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredArticles.map((article, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden hover:border-accent transition-all duration-300 cursor-pointer group">
                  <div className="h-48 bg-gradient-to-br from-accent/20 to-orange-400/20"></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-accent text-sm font-medium">{article.category}</span>
                      <span className="text-gray-400 text-sm">{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{article.date}</span>
                      <span className="text-accent hover:text-orange-400 transition-colors inline-flex items-center">
                        Read More
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-white mb-8">
                {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
              </h2>
              
              <div className="space-y-8">
                {filteredArticles.map((article, index) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-accent transition-all duration-300 cursor-pointer group">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="h-32 bg-gradient-to-br from-accent/20 to-orange-400/20 rounded-lg"></div>
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-accent text-sm font-medium">{article.category}</span>
                          <span className="text-gray-400 text-sm">{article.readTime}</span>
                          <span className="text-gray-400 text-sm">{article.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-300 mb-4">{article.excerpt}</p>
                        <span className="text-accent hover:text-orange-400 transition-colors inline-flex items-center">
                          Read Full Article
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Newsletter Signup */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Stay Updated</h3>
                  <p className="text-gray-300 mb-4">
                    Get the latest tech insights delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Your email"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Button className="btn-primary w-full">
                      Subscribe
                    </Button>
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {articles.slice(0, 3).map((article, index) => (
                      <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                        <h4 className="text-white font-medium mb-2 hover:text-accent transition-colors cursor-pointer">
                          {article.title}
                        </h4>
                        <div className="text-sm text-gray-400">
                          {article.category} • {article.readTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Share</h3>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
