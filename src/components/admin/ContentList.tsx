
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at?: string;
}

interface ContentListProps {
  title: string;
  items: ContentItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  loading?: boolean;
}

const ContentList = ({ title, items, onEdit, onDelete, onCreate, loading }: ContentListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <Button onClick={onCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No items found. Create your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Created: {new Date(item.created_at).toLocaleDateString()}
                      </span>
                      {item.updated_at && (
                        <span className="text-sm text-gray-500">
                          Updated: {new Date(item.updated_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item.id)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentList;
