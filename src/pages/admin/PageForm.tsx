
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ContentStatus = 'draft' | 'published' | 'archived';

const PageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: [] as string[],
    status: 'draft' as ContentStatus,
    content: null as any
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchPage();
    }
  }, [id, isEdit]);

  const fetchPage = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        description: data.description || '',
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        meta_keywords: data.meta_keywords || [],
        status: (data.status || 'draft') as ContentStatus,
        content: data.content
      });
    } catch (error: any) {
      toast({
        title: "Error fetching page",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pageData = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        updated_at: new Date().toISOString()
      };

      if (isEdit) {
        const { error } = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: "Page updated",
          description: "The page has been successfully updated.",
        });
      } else {
        const { error } = await supabase
          .from('pages')
          .insert([pageData]);

        if (error) throw error;
        
        toast({
          title: "Page created",
          description: "The page has been successfully created.",
        });
      }

      navigate('/admin/pages');
    } catch (error: any) {
      toast({
        title: `Error ${isEdit ? 'updating' : 'creating'} page`,
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
          {isEdit ? 'Edit Page' : 'Create Page'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/pages')}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Back to Pages
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Page Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-gray-300">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="slug" className="text-gray-300">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="Auto-generated from title if empty"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="status" className="text-gray-300">Status</Label>
              <Select value={formData.status} onValueChange={(value: ContentStatus) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="draft" className="text-white">Draft</SelectItem>
                  <SelectItem value="published" className="text-white">Published</SelectItem>
                  <SelectItem value="archived" className="text-white">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                rows={2}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/pages')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent-hover text-white"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Page' : 'Create Page')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageForm;
