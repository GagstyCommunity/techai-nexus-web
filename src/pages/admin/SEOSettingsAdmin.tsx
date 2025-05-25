
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ContentList from '@/components/admin/ContentList';
import { useNavigate } from 'react-router-dom';

const SEOSettingsAdmin = () => {
  const [seoSettings, setSeoSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchSeoSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('id, page_type as title, created_at, updated_at')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      
      // Add status field for ContentList compatibility and ensure proper typing
      const settingsWithStatus = (data || []).map((setting: any) => ({
        id: setting.id,
        title: setting.title,
        created_at: setting.created_at,
        updated_at: setting.updated_at,
        status: 'published' as const
      }));
      
      setSeoSettings(settingsWithStatus);
    } catch (error: any) {
      toast({
        title: "Error fetching SEO settings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoSettings();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/seo-settings/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this SEO setting?')) return;

    try {
      const { error } = await supabase
        .from('seo_settings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "SEO setting deleted",
        description: "The SEO setting has been successfully deleted.",
      });
      
      fetchSeoSettings();
    } catch (error: any) {
      toast({
        title: "Error deleting SEO setting",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreate = () => {
    navigate('/admin/seo-settings/new');
  };

  return (
    <ContentList
      title="SEO Settings"
      items={seoSettings}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      loading={loading}
    />
  );
};

export default SEOSettingsAdmin;
