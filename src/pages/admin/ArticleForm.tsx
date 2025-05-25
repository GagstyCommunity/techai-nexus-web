
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

const ArticleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    author_name: '',
    category: '',
    read_time: 0,
    tags: [] as string[],
    meta_title: '',
    meta_description: '',
    status: 'draft' as ContentStatus,
    content: null as any
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchArticle();
    }
  }, [id, isEdit]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        author_name: data.author_name || '',
        category: data.category || '',
        read_time: data.read_time || 0,
        tags: data.tags || [],
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        status: (data.status || 'draft') as ContentStatus,
        content: data.content
      });
    } catch (error: any) {
      toast({
        title: "Error fetching article",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const articleData = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        updated_at: new Date().toISOString(),
        published_at: formData.status === 'published' ? new Date().toISOString() : null
      };

      if (isEdit) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: "Article updated",
          description: "The article has been successfully updated.",
        });
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([articleData]);

        if (error) throw error;
        
        toast({
          title: "Article created",
          description: "The article has been successfully created.",
        });
      }

      navigate('/admin/articles');
    } catch (error: any) {
      toast({
        title: `Error ${isEdit ? 'updating' : 'creating'} article`,
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
          {isEdit ? 'Edit Article' : 'Create Article'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/articles')}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Back to Articles
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Article Details</CardTitle>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author_name" className="text-gray-300">Author Name</Label>
                <Input
                  id="author_name"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-gray-300">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt" className="text-gray-300">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="read_time" className="text-gray-300">Read Time (minutes)</Label>
                <Input
                  id="read_time"
                  type="number"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 0 })}
                  className="bg-gray-700 border-gray-600 text-white"
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
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/articles')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent-hover text-white"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Article' : 'Create Article')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleForm;
