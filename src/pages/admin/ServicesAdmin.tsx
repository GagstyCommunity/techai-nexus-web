
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ContentList from '@/components/admin/ContentList';
import { useNavigate } from 'react-router-dom';

const ServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, title, status, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching services",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/services/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Service deleted",
        description: "The service has been successfully deleted.",
      });
      
      fetchServices();
    } catch (error: any) {
      toast({
        title: "Error deleting service",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreate = () => {
    navigate('/admin/services/new');
  };

  return (
    <ContentList
      title="Services"
      items={services}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      loading={loading}
    />
  );
};

export default ServicesAdmin;
