import React from 'react';
import ServiceTemplate from './ServiceTemplate';

const AIAutomation = () => {
  const serviceData = {
    title: "Automate Your Business with AI",
    description: "Transform manual processes into intelligent, automated workflows that save time, reduce costs, and scale your operations effortlessly.",
    features: [
      "Lead Generation Bots",
      "CRM Automation",
      "Data Scraping & Analysis",
      "Email Outreach Automation",
      "Customer Support AI",
      "Sales Process Automation"
    ],
    benefits: [
      "Reduce manual tasks by up to 85%",
      "24/7 automated customer support",
      "Increase lead generation by 300%",
      "Improve data accuracy by eliminating human error",
      "Scale operations without proportional staff increases",
      "Real-time analytics and reporting",
      "Seamless integration with existing systems",
      "Customizable workflows for your specific needs"
    ],
    technologies: [
      "n8n",
      "Zapier",
      "OpenAI",
      "Python",
      "Make.com",
      "Airtable",
      "Node.js",
      "Custom AI Models"
    ],
    process: [
      {
        title: "Analysis",
        description: "We analyze your current workflows and identify automation opportunities"
      },
      {
        title: "Design",
        description: "Create custom automation blueprints tailored to your needs"
      },
      {
        title: "Implementation",
        description: "Build and integrate automated workflows into your systems"
      },
      {
        title: "Optimization",
        description: "Monitor, test, and optimize for maximum efficiency"
      }
    ],
    pricing: [
      {
        title: "Starter",
        price: "$5,000",
        features: [
          "2 Automated Workflows",
          "Basic AI Integration",
          "Email Support",
          "Monthly Reports",
          "Basic Analytics"
        ]
      },
      {
        title: "Professional",
        price: "$10,000",
        features: [
          "5 Automated Workflows",
          "Advanced AI Integration",
          "Priority Support",
          "Weekly Reports",
          "Advanced Analytics",
          "Custom Dashboards"
        ]
      },
      {
        title: "Enterprise",
        price: "Custom",
        features: [
          "Unlimited Workflows",
          "Custom AI Solutions",
          "24/7 Support",
          "Real-time Reports",
          "Enterprise Analytics",
          "Dedicated Manager"
        ]
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
};

export default AIAutomation;