import { useUser } from "@civic/auth-web3/react";
import { supabase } from "../utils/supabaseClient";
import { useEffect } from "react";

export const useAuth = () => {
  const { user } = useUser();

  useEffect(() => {
    const syncUserWithSupabase = async () => {
      if (user) {
        await supabase.from("users").upsert({
          id: user.id,
          email: user.email,
          name: user.name,
        });
      }
    };
    syncUserWithSupabase();
  }, [user]);

  return { user };
};