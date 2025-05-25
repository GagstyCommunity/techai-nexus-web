
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ContentList from '@/components/admin/ContentList';
import { useNavigate } from 'react-router-dom';

const SolutionsAdmin = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchSolutions = async () => {
    try {
      const { data, error } = await supabase
        .from('solutions')
        .select('id, title, status, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSolutions(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching solutions",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/solutions/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this solution?')) return;

    try {
      const { error } = await supabase
        .from('solutions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Solution deleted",
        description: "The solution has been successfully deleted.",
      });
      
      fetchSolutions();
    } catch (error: any) {
      toast({
        title: "Error deleting solution",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreate = () => {
    navigate('/admin/solutions/new');
  };

  return (
    <ContentList
      title="Solutions"
      items={solutions}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      loading={loading}
    />
  );
};

export default SolutionsAdmin;
