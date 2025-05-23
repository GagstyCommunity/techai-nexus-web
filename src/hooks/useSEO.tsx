
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SEOData {
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  canonical_url?: string;
  robots_directive?: string;
  structured_data?: any;
}

export const useSEO = (pageType: string) => {
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const { data, error } = await supabase
          .from('seo_settings')
          .select('*')
          .eq('page_type', pageType)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching SEO data:', error);
        } else if (data) {
          setSeoData(data);
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSEO();
  }, [pageType]);

  return { seoData, loading };
};
