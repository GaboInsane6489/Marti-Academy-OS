import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export default async function proxy(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Si faltan variables en el middleware, simplemente dejamos pasar o bloqueamos según política.
    // Para estabilidad, dejamos pasar pero logueamos el error.
    console.error(
      "Proxy Middleware Error: Missing Supabase Environment Variables",
    );
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  // 1. Proteger y Segmentar rutas del dashboard
  if (url.pathname.startsWith("/dashboard")) {
    if (!user) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // RBAC: Verificar rol para rutas segmentadas
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role || "estudiante";

    // Si intenta acceder a una ruta de rol distinta, redirigir a su dashboard correspondiente
    if (url.pathname.startsWith("/dashboard/admin") && role !== "admin") {
      url.pathname = "/dashboard/estudiante"; // Fallback seguro
      return NextResponse.redirect(url);
    }
    if (url.pathname.startsWith("/dashboard/docente") && role !== "docente") {
      url.pathname = "/dashboard/estudiante"; // Fallback seguro
      return NextResponse.redirect(url);
    }
    // Nota: dashboard/estudiante es accesible por todos por ahora o podemos ser estrictos
  }

  // 2. Redirigir si ya está logueado y trata de entrar al login
  if (url.pathname === "/login") {
    if (user) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
