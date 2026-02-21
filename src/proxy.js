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

    // --------------------------------------------------------
    // RBAC OPTIMIZADO: Caché en Cookies
    // --------------------------------------------------------
    // Evitamos consultar la BD en cada request leyendo una cookie.

    let role = request.cookies.get("marti-user-role")?.value;
    let needsCookieUpdate = false;

    if (!role) {
      // Si no hay cookie, consultamos a Supabase
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      role = profile?.role || "estudiante";
      needsCookieUpdate = true;
    }

    // Si intenta acceder a una ruta de rol distinta, redirigir
    if (url.pathname.startsWith("/dashboard/admin") && role !== "admin") {
      url.pathname = "/dashboard/estudiante";
      const redirectResponse = NextResponse.redirect(url);
      if (needsCookieUpdate) {
        redirectResponse.cookies.set("marti-user-role", role, {
          path: "/",
          maxAge: 60 * 60 * 24, // 24 horas
          sameSite: "lax",
        });
      }
      return redirectResponse;
    }

    if (
      url.pathname.startsWith("/dashboard/docente") &&
      role !== "docente" &&
      role !== "admin"
    ) {
      // Nota: Admin también puede entrar a docente
      url.pathname = "/dashboard/estudiante";
      const redirectResponse = NextResponse.redirect(url);
      if (needsCookieUpdate) {
        redirectResponse.cookies.set("marti-user-role", role, {
          path: "/",
          maxAge: 60 * 60 * 24,
          sameSite: "lax",
        });
      }
      return redirectResponse;
    }

    // Si pasó las validaciones y necesitamos actualizar la cookie
    if (needsCookieUpdate) {
      // Clonamos la respuesta original para inyectarle la cookie
      // Nota: supabase.auth.getUser() ya pudo haber modificado 'response'
      // pero necesitamos asegurar que la cookie viaje.

      // En Next.js middleware, para setear cookies en la respuesta final 'response',
      // debemos hacerlo antes de devolverla.
      response.cookies.set("marti-user-role", role, {
        path: "/",
        maxAge: 60 * 60 * 24, // 24 horas
        sameSite: "lax",
      });
    }
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
