
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
import { Checkbox } from '@/components/ui/checkbox';

const TestimonialForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    client_name: '',
    client_position: '',
    client_company: '',
    testimonial_text: '',
    project_type: '',
    rating: 5,
    featured: false,
    status: 'draft' as const
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchTestimonial();
    }
  }, [id, isEdit]);

  const fetchTestimonial = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        client_name: data.client_name || '',
        client_position: data.client_position || '',
        client_company: data.client_company || '',
        testimonial_text: data.testimonial_text || '',
        project_type: data.project_type || '',
        rating: data.rating || 5,
        featured: data.featured || false,
        status: data.status || 'draft'
      });
    } catch (error: any) {
      toast({
        title: "Error fetching testimonial",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const testimonialData = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      if (isEdit) {
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', id);

        if (error) throw error;
        
        toast({
          title: "Testimonial updated",
          description: "The testimonial has been successfully updated.",
        });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([testimonialData]);

        if (error) throw error;
        
        toast({
          title: "Testimonial created",
          description: "The testimonial has been successfully created.",
        });
      }

      navigate('/admin/testimonials');
    } catch (error: any) {
      toast({
        title: `Error ${isEdit ? 'updating' : 'creating'} testimonial`,
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
          {isEdit ? 'Edit Testimonial' : 'Create Testimonial'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/testimonials')}
          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Back to Testimonials
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Testimonial Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client_name" className="text-gray-300">Client Name *</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="client_position" className="text-gray-300">Client Position</Label>
                <Input
                  id="client_position"
                  value={formData.client_position}
                  onChange={(e) => setFormData({ ...formData, client_position: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client_company" className="text-gray-300">Client Company</Label>
                <Input
                  id="client_company"
                  value={formData.client_company}
                  onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="project_type" className="text-gray-300">Project Type</Label>
                <Input
                  id="project_type"
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="testimonial_text" className="text-gray-300">Testimonial Text *</Label>
              <Textarea
                id="testimonial_text"
                value={formData.testimonial_text}
                onChange={(e) => setFormData({ ...formData, testimonial_text: e.target.value })}
                required
                className="bg-gray-700 border-gray-600 text-white"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="rating" className="text-gray-300">Rating (1-5)</Label>
                <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="1" className="text-white">1 Star</SelectItem>
                    <SelectItem value="2" className="text-white">2 Stars</SelectItem>
                    <SelectItem value="3" className="text-white">3 Stars</SelectItem>
                    <SelectItem value="4" className="text-white">4 Stars</SelectItem>
                    <SelectItem value="5" className="text-white">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
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

              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: Boolean(checked) })}
                />
                <Label htmlFor="featured" className="text-gray-300">Featured</Label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/testimonials')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent-hover text-white"
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Testimonial' : 'Create Testimonial')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialForm;
