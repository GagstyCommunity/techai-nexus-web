
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminUserCard from './AdminUserCard';

interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_login: string | null;
}

interface AdminUserListProps {
  users: AdminUser[];
  loading: boolean;
  onDeleteUser: (userId: string) => void;
}

const AdminUserList = ({ users, loading, onDeleteUser }: AdminUserListProps) => {
  return (
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
            {users.map((user) => (
              <AdminUserCard
                key={user.id}
                user={user}
                onDelete={onDeleteUser}
              />
            ))}
            {users.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No admin users found
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUserList;
