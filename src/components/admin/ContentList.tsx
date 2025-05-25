
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
        return 'bg-green-500 text-white hover:bg-green-600';
      case 'draft':
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      case 'archived':
        return 'bg-gray-500 text-white hover:bg-gray-600';
      default:
        return 'bg-gray-500 text-white hover:bg-gray-600';
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <Button onClick={onCreate} className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white">
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </div>

      {items.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-8">
            <p className="text-gray-300">No items found. Create your first one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700 hover:border-accent transition-colors">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        Created: {new Date(item.created_at).toLocaleDateString()}
                      </span>
                      {item.updated_at && (
                        <span className="text-sm text-gray-400">
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
                      className="flex items-center gap-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700"
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
