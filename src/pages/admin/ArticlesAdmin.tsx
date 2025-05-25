
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ContentList from '@/components/admin/ContentList';
import { useNavigate } from 'react-router-dom';

const ArticlesAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, status, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching articles",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/articles/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Article deleted",
        description: "The article has been successfully deleted.",
      });
      
      fetchArticles();
    } catch (error: any) {
      toast({
        title: "Error deleting article",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreate = () => {
    navigate('/admin/articles/new');
  };

  return (
    <ContentList
      title="Articles"
      items={articles}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      loading={loading}
    />
  );
};

export default ArticlesAdmin;
