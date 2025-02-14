const { createClient } = require("@supabase/supabase-js");

// Replace with your Supabase project URL and API key
const SUPABASE_URL = "https://.supabase.co";
const SUPABASE_KEY = "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
