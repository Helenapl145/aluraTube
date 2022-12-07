import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://ikzkzpgbkbmaanetskgx.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlremt6cGdia2JtYWFuZXRza2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAzMjcwNzgsImV4cCI6MTk4NTkwMzA3OH0.1VteWqqND8QIOkPCmeSQksaPryyCmC5HgYJpeNCjdz4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);



export function videoService() {
    return {
        getAllVideos() {
           return supabase.from("video")
                .select("*")
        }
    }
}