/*
  # Create case studies schema

  1. New Tables
    - `case_studies`
      - Standard fields from existing schema
      - Additional content and metadata fields

  2. Sample Data
    - Insert initial case studies
*/

-- Insert sample case studies if none exist
INSERT INTO case_studies (
  title,
  slug,
  client_name,
  description,
  challenge,
  solution,
  results,
  technologies,
  status
)
SELECT
  'AI-Powered Customer Service Automation',
  'ai-customer-service-automation',
  'TechCorp Inc.',
  'Implementing AI automation to transform customer service operations',
  'Manual customer service processes leading to long response times and inconsistent service quality',
  'Developed an AI-powered automation system with chatbots and intelligent routing',
  jsonb_build_object(
    'response_time', '85% reduction',
    'customer_satisfaction', '95% positive',
    'cost_savings', '60% reduction in operational costs'
  ),
  ARRAY['OpenAI', 'Python', 'Node.js', 'React'],
  'published'
WHERE NOT EXISTS (SELECT 1 FROM case_studies LIMIT 1);

INSERT INTO case_studies (
  title,
  slug,
  client_name,
  description,
  challenge,
  solution,
  results,
  technologies,
  status
)
SELECT
  'Web3 Marketplace Development',
  'web3-marketplace-development',
  'CryptoTrade Ltd',
  'Building a decentralized marketplace for digital assets',
  'Need for a secure, scalable platform for trading digital assets',
  'Created a Web3-powered marketplace with smart contracts and user-friendly interface',
  jsonb_build_object(
    'transactions', '100,000+ monthly',
    'user_growth', '300% in first quarter',
    'platform_security', 'Zero security incidents'
  ),
  ARRAY['Solidity', 'React', 'Node.js', 'Web3.js'],
  'published'
WHERE NOT EXISTS (SELECT 1 FROM case_studies WHERE slug = 'web3-marketplace-development');