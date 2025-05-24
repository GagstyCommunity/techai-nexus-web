
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreateAdminUserProps {
  onUserCreated: () => void;
}

const CreateAdminUser = ({ onUserCreated }: CreateAdminUserProps) => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('admin');
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const createAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail || !newUserPassword) return;

    setIsCreating(true);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Add to admin_users table using type assertion
        const { error: adminError } = await (supabase as any)
          .from('admin_users')
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
        onUserCreated();
      }
    } catch (error: any) {
      console.error('Error creating admin user:', error);
      toast({
        title: "Error creating admin user",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
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
              disabled={isCreating}
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
              disabled={isCreating}
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={isCreating}
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <Button type="submit" className="w-full" disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create Admin User'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateAdminUser;
