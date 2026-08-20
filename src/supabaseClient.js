import { createClient } from '@supabase/supabase-js';

// நேரடியாக URL மற்றும் Key கொடுக்கப்பட்டுள்ளது
const supabaseUrl = "https://borhvihrffhahrsgfszm.supabase.co";
const supabaseAnonKey = "sb_publishable_am_wnVRQyTzXeTF9HhZ-bg_csDhO4fO";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);