import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useToolLogger = (toolName: string, action: string, metadata?: any) => {
  useEffect(() => {
    const logToolUsage = async () => {
      try {
        const { error } = await supabase.from('tool_logs').insert({
          tool_name: toolName,
          action: action,
          user_agent: navigator.userAgent,
          session_id: sessionStorage.getItem('session_id') || 'anonymous',
          metadata: metadata
        });

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error('Error logging tool usage:', error);
        // Silently fail in production to not disrupt user experience
        if (process.env.NODE_ENV === 'development') {
          console.warn('Tool logging failed. Please ensure Supabase CORS settings are configured correctly.');
        }
      }
    };

    logToolUsage();
  }, [toolName, action, metadata]);
};