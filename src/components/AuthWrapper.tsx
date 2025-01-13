import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supaClient } from "../api/client";

export default function AuthWrapper() {
  return (
    <Auth
      supabaseClient={supaClient}
      providers={["google"]}
      appearance={{ theme: ThemeSupa }}
    />
  );
}
