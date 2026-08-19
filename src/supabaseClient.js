
import { createClient } from '@supabase/supabase-js'

// ไปเอา URL และ KEY มาจากเมนู Project Settings > API ในเว็บ Supabase
const supabaseUrl =  'https://atbyudnixujiwlxepchh.supabase.co'
const supabaseAnonKey = 'sb_publishable_leBQo88PZWYV800h4C6dUA_Oj4gMzMm'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


