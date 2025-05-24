
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

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
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('admin');
  const { toast } = useToast();

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      // Use raw query since types aren't updated yet
      const { data, error } = await supabase
        .from('admin_users' as any)
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

  const createAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail || !newUserPassword) return;

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Add to admin_users table
        const { error: adminError } = await supabase
          .from('admin_users' as any)
          .insert({
            id: authData.user.id,
            email: newUserEmail,
            role: newUserRole,
          });

        if (adminError) throw adminError;

        toast({
          title: "Admin user created",
          description: "New admin user has been successfully created.",
        });

        setNewUserEmail('');
        setNewUserPassword('');
        fetchAdminUsers();
      }
    } catch (error: any) {
      console.error('Error creating admin user:', error);
      toast({
        title: "Error creating admin user",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteAdminUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this admin user?')) return;

    try {
      const { error } = await supabase
        .from('admin_users' as any)
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
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Manage admin users and system access</p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Admin Users</TabsTrigger>
          <TabsTrigger value="create">Create User</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage system administrators</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <div className="space-y-4">
                  {adminUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{user.email}</div>
                        <div className="text-sm text-gray-500">
                          Created: {new Date(user.created_at).toLocaleDateString()}
                        </div>
                        {user.last_login && (
                          <div className="text-sm text-gray-500">
                            Last login: {new Date(user.last_login).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteAdminUser(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  {adminUsers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No admin users found
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create Admin User</CardTitle>
              <CardDescription>Add a new administrator to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={createAdminUser} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <Button type="submit" className="w-full">
                  Create Admin User
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
