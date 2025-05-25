
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ContentList from '@/components/admin/ContentList';
import { useNavigate } from 'react-router-dom';

const CaseStudiesAdmin = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('id, title, status, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching case studies",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/case-studies/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;

    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Case study deleted",
        description: "The case study has been successfully deleted.",
      });
      
      fetchCaseStudies();
    } catch (error: any) {
      toast({
        title: "Error deleting case study",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreate = () => {
    navigate('/admin/case-studies/new');
  };

  return (
    <ContentList
      title="Case Studies"
      items={caseStudies}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      loading={loading}
    />
  );
};

export default CaseStudiesAdmin;
