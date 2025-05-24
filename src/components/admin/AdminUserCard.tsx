
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_login: string | null;
}

interface AdminUserCardProps {
  user: AdminUser;
  onDelete: (userId: string) => void;
}

const AdminUserCard = ({ user, onDelete }: AdminUserCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
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
          onClick={() => onDelete(user.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AdminUserCard;
