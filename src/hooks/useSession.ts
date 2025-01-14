import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supaClient } from "../client";

export default function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supaClient.auth.getSession();
      setSession(session);
    };

    getSession();

    const {
      data: { subscription },
    } = supaClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session;
}
