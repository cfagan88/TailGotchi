import { Auth } from "@supabase/auth-ui-react";
import { supaClient } from "../api/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Login() {
  return (
    <div className="bg-primarylight flex justify-center m-auto w-screen h-[70vh]">
      <Auth
        supabaseClient={supaClient}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
      />
    </div>
  );
}
