
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ContentList from '@/components/admin/ContentList';
import { useNavigate } from 'react-router-dom';

const PagesAdmin = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('id, title, status, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching pages",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/pages/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Page deleted",
        description: "The page has been successfully deleted.",
      });
      
      fetchPages();
    } catch (error: any) {
      toast({
        title: "Error deleting page",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreate = () => {
    navigate('/admin/pages/new');
  };

  return (
    <ContentList
      title="Pages"
      items={pages}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      loading={loading}
    />
  );
};

export default PagesAdmin;
