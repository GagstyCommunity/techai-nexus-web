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

const CaseStudyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    client_name: '',
    client_logo: '',
    industry: '',
    challenge: '',
    solution: '',
    testimonial_quote: '',
    testimonial_author: '',
    testimonial_position: '',
    project_duration: '',
    team_size: 0,
    technologies: [] as string[],
    meta_title: '',
    meta_description: '',
    status: 'draft' as ContentStatus,
    content: null as any,
    results: null as any
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchCaseStudy();
    }
  }, [id, isEdit]);

  const fetchCaseStudy = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        description: data.description || '',
        client_name: data.client_name || '',
        client_logo: data.client_logo || '',
        industry: data.industry || '',
        challenge: data.challenge || '',
        solution: data.solution || '',
        testimonial_quote: data.testimonial_quote || '',
        testimonial_author: data.testimonial_author || '',
        testimonial_position: data.testimonial_position || '',
        project_duration: data.project_duration || '',
        team_size: data.team_size || 0,
        technologies: data.technologies || [],
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        status: (data.status || 'draft') as ContentStatus,
        content: data.content,
        results: data.results
      });
    } catch (error: any) {
      toast({
        title: "Error fetching case study",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const caseStudyData = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        updated_at: new Date().toISOString()
      };

      if (isEdit) {
        const { error } = await supabase
          .from('case_studies')
          .update(caseStudyData)
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: "Case study updated",
          description: "The case study has been successfully updated.",
        });
      } else {
        const { error } = await supabase
          .from('case_studies')
          .insert([caseStudyData]);

        if (error) throw error;
        
        toast({
          title: "Case study created",
          description: "The case study has been successfully created.",
        });
      }

      navigate('/admin/case-studies');
    } catch (error: any) {
      toast({
        title: `Error ${isEdit ? 'updating' : 'creating'} case study`,
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
          {isEdit ? 'Edit Case Study' : 'Create Case Study'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/case-studies')}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Back to Case Studies
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Case Study Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="client_name" className="text-gray-300">Client Name</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="industry" className="text-gray-300">Industry</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="project_duration" className="text-gray-300">Project Duration</Label>
                <Input
                  id="project_duration"
                  value={formData.project_duration}
                  onChange={(e) => setFormData({ ...formData, project_duration: e.target.value })}
                  placeholder="e.g., 3 months"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
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
              <Label htmlFor="challenge" className="text-gray-300">Challenge</Label>
              <Textarea
                id="challenge"
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="solution" className="text-gray-300">Solution</Label>
              <Textarea
                id="solution"
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
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

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/case-studies')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent-hover text-white"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Case Study' : 'Create Case Study')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudyForm;
