
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useToolLogger = (toolName: string, action: string, metadata?: any) => {
  useEffect(() => {
    const logToolUsage = async () => {
      try {
        await supabase.from('tool_logs').insert({
          tool_name: toolName,
          action: action,
          user_agent: navigator.userAgent,
          session_id: sessionStorage.getItem('session_id') || 'anonymous',
          metadata: metadata
        });
      } catch (error) {
        console.error('Error logging tool usage:', error);
      }
    };

    logToolUsage();
  }, [toolName, action, metadata]);
};
