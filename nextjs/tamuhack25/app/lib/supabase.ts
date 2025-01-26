// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!; // Your Supabase URL
const supabaseKey = process.env.SUPABASE_ANON_KEY!; // Your Supabase Anon Key

export const supabase = createClient(supabaseUrl, supabaseKey);
