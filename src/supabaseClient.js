
import { createClient } from '@supabase/supabase-js'

// ไปเอา URL และ KEY มาจากเมนู Project Settings > API ในเว็บ Supabase
const SUPABASE_URL = 'https://atbyudnixujiwlxepchh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_leBQo88PZWYV800h4C6dUA_Oj4gMzMm';


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


