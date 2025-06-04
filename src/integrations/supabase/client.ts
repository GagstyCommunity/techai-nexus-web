import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yrelkcxrvsilnxzgizul.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZWxrY3hydnNpbG54emdpenVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzA4NzIsImV4cCI6MjA2MzYwNjg3Mn0.kUXnoovSVjbPMj-1ddE_yjLSuq4cBGKrrMRVo433J_g";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false
  },
  global: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});