
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminUserList from './AdminUserList';
import CreateAdminUser from './CreateAdminUser';

interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_login: string | null;
}

const AdminDashboard = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      // Use type assertion for the new table
      const { data, error } = await (supabase as any)
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdminUsers(data || []);
    } catch (error: any) {
      console.error('Error fetching admin users:', error);
      toast({
        title: "Error fetching admin users",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAdminUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this admin user?')) return;

    try {
      // Use type assertion for the new table
      const { error } = await (supabase as any)
        .from('admin_users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Admin user deleted",
        description: "Admin user has been successfully deleted.",
      });

      fetchAdminUsers();
    } catch (error: any) {
      console.error('Error deleting admin user:', error);
      toast({
        title: "Error deleting admin user",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-300">Manage admin users and system access</p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="users" className="data-[state=active]:bg-accent data-[state=active]:text-white">Admin Users</TabsTrigger>
          <TabsTrigger value="create" className="data-[state=active]:bg-accent data-[state=active]:text-white">Create User</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <AdminUserList
            users={adminUsers}
            loading={loading}
            onDeleteUser={deleteAdminUser}
          />
        </TabsContent>

        <TabsContent value="create">
          <CreateAdminUser onUserCreated={fetchAdminUsers} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
