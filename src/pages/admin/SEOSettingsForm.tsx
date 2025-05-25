
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SEOSettingsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    page_type: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: [] as string[],
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    canonical_url: '',
    robots_directive: 'index,follow',
    structured_data: null as any
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchSEOSetting();
    }
  }, [id, isEdit]);

  const fetchSEOSetting = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        page_type: data.page_type || '',
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        meta_keywords: data.meta_keywords || [],
        og_title: data.og_title || '',
        og_description: data.og_description || '',
        og_image: data.og_image || '',
        twitter_title: data.twitter_title || '',
        twitter_description: data.twitter_description || '',
        twitter_image: data.twitter_image || '',
        canonical_url: data.canonical_url || '',
        robots_directive: data.robots_directive || 'index,follow',
        structured_data: data.structured_data
      });
    } catch (error: any) {
      toast({
        title: "Error fetching SEO setting",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const seoData = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      if (isEdit) {
        const { error } = await supabase
          .from('seo_settings')
          .update(seoData)
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: "SEO setting updated",
          description: "The SEO setting has been successfully updated.",
        });
      } else {
        const { error } = await supabase
          .from('seo_settings')
          .insert([seoData]);

        if (error) throw error;
        
        toast({
          title: "SEO setting created",
          description: "The SEO setting has been successfully created.",
        });
      }

      navigate('/admin/seo-settings');
    } catch (error: any) {
      toast({
        title: `Error ${isEdit ? 'updating' : 'creating'} SEO setting`,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          {isEdit ? 'Edit SEO Setting' : 'Create SEO Setting'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/seo-settings')}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Back to SEO Settings
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">SEO Setting Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="page_type" className="text-gray-300">Page Type *</Label>
              <Input
                id="page_type"
                value={formData.page_type}
                onChange={(e) => setFormData({ ...formData, page_type: e.target.value })}
                required
                placeholder="e.g., home, about, services"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Basic Meta Tags</h3>
              
              <div>
                <Label htmlFor="meta_title" className="text-gray-300">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="meta_description" className="text-gray-300">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Open Graph Tags</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="og_title" className="text-gray-300">OG Title</Label>
                  <Input
                    id="og_title"
                    value={formData.og_title}
                    onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="og_image" className="text-gray-300">OG Image URL</Label>
                  <Input
                    id="og_image"
                    value={formData.og_image}
                    onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="og_description" className="text-gray-300">OG Description</Label>
                <Textarea
                  id="og_description"
                  value={formData.og_description}
                  onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={2}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Twitter Tags</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="twitter_title" className="text-gray-300">Twitter Title</Label>
                  <Input
                    id="twitter_title"
                    value={formData.twitter_title}
                    onChange={(e) => setFormData({ ...formData, twitter_title: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="twitter_image" className="text-gray-300">Twitter Image URL</Label>
                  <Input
                    id="twitter_image"
                    value={formData.twitter_image}
                    onChange={(e) => setFormData({ ...formData, twitter_image: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="twitter_description" className="text-gray-300">Twitter Description</Label>
                <Textarea
                  id="twitter_description"
                  value={formData.twitter_description}
                  onChange={(e) => setFormData({ ...formData, twitter_description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={2}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Technical SEO</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="canonical_url" className="text-gray-300">Canonical URL</Label>
                  <Input
                    id="canonical_url"
                    value={formData.canonical_url}
                    onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="robots_directive" className="text-gray-300">Robots Directive</Label>
                  <Input
                    id="robots_directive"
                    value={formData.robots_directive}
                    onChange={(e) => setFormData({ ...formData, robots_directive: e.target.value })}
                    placeholder="index,follow"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/seo-settings')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent-hover text-white"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update SEO Setting' : 'Create SEO Setting')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOSettingsForm;
