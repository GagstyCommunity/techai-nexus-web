
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

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    short_description: '',
    meta_title: '',
    meta_description: '',
    status: 'draft' as const,
    category: null as any,
    features: [] as string[],
    technologies: [] as string[],
    content: null as any
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchService();
    }
  }, [id, isEdit]);

  const fetchService = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        description: data.description || '',
        short_description: data.short_description || '',
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        status: data.status || 'draft',
        category: data.category,
        features: data.features || [],
        technologies: data.technologies || [],
        content: data.content
      });
    } catch (error: any) {
      toast({
        title: "Error fetching service",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const serviceData = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        updated_at: new Date().toISOString()
      };

      if (isEdit) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: "Service updated",
          description: "The service has been successfully updated.",
        });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([serviceData]);

        if (error) throw error;
        
        toast({
          title: "Service created",
          description: "The service has been successfully created.",
        });
      }

      navigate('/admin/services');
    } catch (error: any) {
      toast({
        title: `Error ${isEdit ? 'updating' : 'creating'} service`,
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
          {isEdit ? 'Edit Service' : 'Create Service'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/services')}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Back to Services
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Service Details</CardTitle>
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
              <Label htmlFor="short_description" className="text-gray-300">Short Description</Label>
              <Input
                id="short_description"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
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
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="status" className="text-gray-300">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
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
              <Label htmlFor="category" className="text-gray-300">Category</Label>
              <Select value={formData.category || ''} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="ai-tools" className="text-white">AI Tools</SelectItem>
                  <SelectItem value="ai-automation" className="text-white">AI Automation</SelectItem>
                  <SelectItem value="web3" className="text-white">Web3</SelectItem>
                  <SelectItem value="web-development" className="text-white">Web Development</SelectItem>
                  <SelectItem value="growth-hacking" className="text-white">Growth Hacking</SelectItem>
                  <SelectItem value="devops" className="text-white">DevOps</SelectItem>
                  <SelectItem value="ui-ux" className="text-white">UI/UX</SelectItem>
                  <SelectItem value="launch-lab" className="text-white">Launch Lab</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/services')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent-hover text-white"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Service' : 'Create Service')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceForm;
