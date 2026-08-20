
import { createClient } from '@supabase/supabase-js'

// ไปเอา URL และ KEY มาจากเมนู Project Settings > API ในเว็บ Supabase
const supabaseUrl =  'https://atbyudnixujiwlxepchh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0Ynl1ZG5peHVqaXdseGVwY2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNTM0MDQsImV4cCI6MjEwMjcyOTQwNH0.zaZOk2dJzXwip3n9DxBXDObELI5XFSUoEe2NzdfdD1c'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


