
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ToolLogsAdmin = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('tool_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setLogs(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching tool logs",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Tool Logs</h1>
        <p className="text-gray-300">Analytics and usage tracking</p>
      </div>

      {logs.length === 0 ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-8">
            <p className="text-gray-300">No logs found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {logs.map((log: any) => (
            <Card key={log.id} className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-white">{log.tool_name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className="bg-blue-500 text-white">
                        {log.action}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                      {log.ip_address && (
                        <span className="text-sm text-gray-400">
                          IP: {log.ip_address}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {log.metadata && (
                  <div className="mt-4">
                    <pre className="text-xs text-gray-300 bg-gray-900 p-2 rounded overflow-auto">
                      {JSON.stringify(log.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolLogsAdmin;
