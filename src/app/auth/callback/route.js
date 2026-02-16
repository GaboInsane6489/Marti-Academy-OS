import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const cookieStore = await cookies();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error(
        "Auth Callback Error: Missing Supabase Environment Variables",
      );
      return NextResponse.redirect(`${origin}/login?error=config-error`);
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            console.warn(
              "SetAll caught error in GET (expected in some contexts):",
              error.message,
            );
          }
        },
      },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const next = requestUrl.searchParams.get("next") || "/dashboard";
      return NextResponse.redirect(new URL(next, origin).toString());
    } else {
      console.error("Auth Callback Error (Session Exchange):", error.message);
    }
  }

  // Si hay error o no hay código, volver al login
  return NextResponse.redirect(`${origin}/login?error=auth-failed`);
}
