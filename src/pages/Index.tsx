
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import AIAutomationSection from '@/components/sections/AIAutomationSection';
import FeaturedCaseStudySection from '@/components/sections/FeaturedCaseStudySection';
import ArticlesPreviewSection from '@/components/sections/ArticlesPreviewSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import { useSEO } from '@/hooks/useSEO';
import { useToolLogger } from '@/hooks/useToolLogger';
import SEOOptimizer from '@/components/SEOOptimizer';

const Index = () => {
  const { seoData } = useSEO('home');
  useToolLogger('homepage', 'view');

  const defaultSEO = {
    title: "TechAI Labs - End-to-End Tech Solutions | AI, Web3, Development",
    description: "Transform your business with AI automation, Web3 development, and custom tech solutions. Expert team delivering scalable results for startups and enterprises.",
    keywords: ["AI automation", "Web3 development", "custom tech solutions", "TechAI Labs"]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TechAI Labs",
    "description": "End-to-End Tech Solutions for AI, Web3, and Development",
    "url": "https://techailabs.com",
    "logo": "https://techailabs.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-753-478-4140",
      "contactType": "Customer Service"
    },
    "sameAs": [
      "https://twitter.com/techailabs",
      "https://linkedin.com/company/techailabs"
    ]
  };

  return (
    <>
      <SEOOptimizer
        title={seoData?.meta_title || defaultSEO.title}
        description={seoData?.meta_description || defaultSEO.description}
        keywords={seoData?.meta_keywords || defaultSEO.keywords}
        ogTitle={seoData?.og_title || defaultSEO.title}
        ogDescription={seoData?.og_description || defaultSEO.description}
        ogImage={seoData?.og_image}
        twitterTitle={seoData?.twitter_title || defaultSEO.title}
        twitterDescription={seoData?.twitter_description || defaultSEO.description}
        twitterImage={seoData?.twitter_image}
        canonicalUrl={seoData?.canonical_url || "https://techailabs.com"}
        robots={seoData?.robots_directive}
        structuredData={seoData?.structured_data || structuredData}
      />
      
      <Layout
        title={seoData?.meta_title || defaultSEO.title}
        description={seoData?.meta_description || defaultSEO.description}
      >
        <HeroSection />
        <ServicesSection />
        <WhyChooseSection />
        <AIAutomationSection />
        <FeaturedCaseStudySection />
        <ArticlesPreviewSection />
        <FinalCTASection />
      </Layout>
    </>
  );
};

export default Index;
