
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import AIAutomationSection from '@/components/sections/AIAutomationSection';
import FeaturedCaseStudySection from '@/components/sections/FeaturedCaseStudySection';
import ArticlesPreviewSection from '@/components/sections/ArticlesPreviewSection';
import FinalCTASection from '@/components/sections/FinalCTASection';

const Index = () => {
  return (
    <Layout
      title="TechAI Labs - End-to-End Tech Solutions | AI, Web3, Development"
      description="Transform your business with AI automation, Web3 development, and custom tech solutions. Expert team delivering scalable results for startups and enterprises."
    >
      <HeroSection />
      <ServicesSection />
      <WhyChooseSection />
      <AIAutomationSection />
      <FeaturedCaseStudySection />
      <ArticlesPreviewSection />
      <FinalCTASection />
    </Layout>
  );
};

export default Index;
