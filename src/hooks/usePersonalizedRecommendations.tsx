
import { useState, useEffect } from 'react';

interface BrowsingData {
  page: string;
  timestamp: number;
  duration: number;
  service?: string;
}

interface Recommendation {
  serviceSlug: string;
  title: string;
  reason: string;
  score: number;
}

export const usePersonalizedRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [browsingHistory, setBrowsingHistory] = useState<BrowsingData[]>([]);

  useEffect(() => {
    // Load browsing history from localStorage
    const stored = localStorage.getItem('browsingHistory');
    if (stored) {
      setBrowsingHistory(JSON.parse(stored));
    }
  }, []);

  const trackPageVisit = (page: string, service?: string) => {
    const visit: BrowsingData = {
      page,
      timestamp: Date.now(),
      duration: 0,
      service,
    };

    const updatedHistory = [...browsingHistory, visit].slice(-50); // Keep last 50 visits
    setBrowsingHistory(updatedHistory);
    localStorage.setItem('browsingHistory', JSON.stringify(updatedHistory));
  };

  const generateRecommendations = (): Recommendation[] => {
    if (browsingHistory.length === 0) {
      return getDefaultRecommendations();
    }

    const serviceInterests = analyzeServiceInterests();
    const recommendations: Recommendation[] = [];

    // AI-based recommendations
    if (serviceInterests.includes('ai') || serviceInterests.includes('automation')) {
      recommendations.push({
        serviceSlug: 'ai-automation',
        title: 'AI Automation',
        reason: 'Based on your interest in AI and automation',
        score: 0.9,
      });
    }

    // Web3 recommendations
    if (serviceInterests.includes('blockchain') || serviceInterests.includes('web3')) {
      recommendations.push({
        serviceSlug: 'web3',
        title: 'Web3 Development',
        reason: 'You\'ve shown interest in blockchain technology',
        score: 0.8,
      });
    }

    // Development recommendations
    if (serviceInterests.includes('development') || serviceInterests.includes('website')) {
      recommendations.push({
        serviceSlug: 'web-development',
        title: 'Web Development',
        reason: 'Based on your web development interests',
        score: 0.7,
      });
    }

    // Growth recommendations
    if (serviceInterests.includes('marketing') || serviceInterests.includes('growth')) {
      recommendations.push({
        serviceSlug: 'growth-hacking',
        title: 'Growth Hacking',
        reason: 'Perfect for scaling your business',
        score: 0.6,
      });
    }

    return recommendations.length > 0 ? recommendations : getDefaultRecommendations();
  };

  const analyzeServiceInterests = (): string[] => {
    const interests: string[] = [];
    const pageCounts: { [key: string]: number } = {};

    browsingHistory.forEach(visit => {
      if (visit.service) {
        pageCounts[visit.service] = (pageCounts[visit.service] || 0) + 1;
      }
      
      // Analyze page content for keywords
      const page = visit.page.toLowerCase();
      if (page.includes('ai') || page.includes('automation')) interests.push('ai');
      if (page.includes('web3') || page.includes('blockchain')) interests.push('blockchain');
      if (page.includes('development') || page.includes('website')) interests.push('development');
      if (page.includes('marketing') || page.includes('growth')) interests.push('marketing');
    });

    return [...new Set(interests)];
  };

  const getDefaultRecommendations = (): Recommendation[] => [
    {
      serviceSlug: 'ai-automation',
      title: 'AI Automation',
      reason: 'Our most popular service for business efficiency',
      score: 0.8,
    },
    {
      serviceSlug: 'web-development',
      title: 'Web Development',
      reason: 'Perfect for establishing your online presence',
      score: 0.7,
    },
    {
      serviceSlug: 'ai-tools',
      title: 'AI Tool Development',
      reason: 'Custom AI solutions for your business needs',
      score: 0.6,
    },
  ];

  useEffect(() => {
    setRecommendations(generateRecommendations());
  }, [browsingHistory]);

  return {
    recommendations,
    trackPageVisit,
    browsingHistory,
  };
};
