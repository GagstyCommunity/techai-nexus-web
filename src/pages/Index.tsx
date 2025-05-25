
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AIAutomationSection from '@/components/sections/AIAutomationSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import FeaturedCaseStudySection from '@/components/sections/FeaturedCaseStudySection';
import ArticlesPreviewSection from '@/components/sections/ArticlesPreviewSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import SEOOptimizer from '@/components/SEOOptimizer';
import RecommendationEngine from '@/components/RecommendationEngine';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import SmoothScrollAnimations from '@/components/SmoothScrollAnimations';
import { useSEO } from '@/hooks/useSEO';
import { useToolLogger } from '@/hooks/useToolLogger';
import { usePersonalizedRecommendations } from '@/hooks/usePersonalizedRecommendations';

const Index = () => {
  const { seoData } = useSEO('home');
  const { trackPageVisit } = usePersonalizedRecommendations();
  
  useToolLogger('homepage', 'view');

  useEffect(() => {
    trackPageVisit('homepage');
  }, []);

  const defaultSEO = {
    title: "TechAI Labs - End-to-End Tech Solutions | AI, Web3, Development",
    description: "Transform your business with AI automation, Web3 development, and custom tech solutions. Expert team delivering scalable results for startups and enterprises.",
    keywords: ["AI automation", "Web3 development", "custom software", "tech solutions"]
  };

  return (
    <>
      <SEOOptimizer
        title={seoData?.meta_title || defaultSEO.title}
        description={seoData?.meta_description || defaultSEO.description}
        keywords={seoData?.meta_keywords || defaultSEO.keywords}
        ogTitle={seoData?.og_title}
        ogDescription={seoData?.og_description}
        ogImage={seoData?.og_image}
        twitterTitle={seoData?.twitter_title}
        twitterDescription={seoData?.twitter_description}
        twitterImage={seoData?.twitter_image}
        canonicalUrl={seoData?.canonical_url}
        robots={seoData?.robots_directive}
        structuredData={seoData?.structured_data}
      />
      
      <Layout
        title={seoData?.meta_title || defaultSEO.title}
        description={seoData?.meta_description || defaultSEO.description}
      >
        <SmoothScrollAnimations animation="fade-up">
          <HeroSection />
        </SmoothScrollAnimations>
        
        <SmoothScrollAnimations animation="fade-up" delay={200}>
          <div className="section-container py-12">
            <RecommendationEngine />
          </div>
        </SmoothScrollAnimations>
        
        <SmoothScrollAnimations animation="slide-left" delay={400}>
          <ServicesSection />
        </SmoothScrollAnimations>
        
        <SmoothScrollAnimations animation="slide-right" delay={600}>
          <AIAutomationSection />
        </SmoothScrollAnimations>
        
        <SmoothScrollAnimations animation="fade-up" delay={800}>
          <WhyChooseSection />
        </SmoothScrollAnimations>
        
        <SmoothScrollAnimations animation="scale-up" delay={1000}>
          <FeaturedCaseStudySection />
        </SmoothScrollAnimations>
        
        <SmoothScrollAnimations animation="fade-up" delay={1200}>
          <ArticlesPreviewSection />
        </SmoothScrollAnimations>
        
        <SmoothScrollAnimations animation="fade-up" delay={1400}>
          <div className="section-container py-12">
            <NewsletterSubscription />
          </div>
        </SmoothScrollAnimations>
        
        <SmoothScrollAnimations animation="fade-up" delay={1600}>
          <FinalCTASection />
        </SmoothScrollAnimations>
      </Layout>
    </>
  );
};

export default Index;
