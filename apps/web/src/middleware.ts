import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured } from "@/lib/supabase";

const PRIVATE_ROUTES = ["/dashboard", "/roadmap", "/labs", "/mentor", "/profile", "/assessment"];
const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/forgot-password"];
const LOCKED_ROUTES = ["/ctf", "/marketplace", "/portfolio"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes hors-scope V1 : code conservé pour V2, accès désactivé
  if (LOCKED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Mode démo : pas de projet Supabase configuré, on laisse tout passer
  if (!isSupabaseConfigured) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPrivate = PRIVATE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isPrivate && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/roadmap/:path*",
    "/labs/:path*",
    "/mentor/:path*",
    "/profile/:path*",
    "/assessment/:path*",
    "/ctf/:path*",
    "/marketplace/:path*",
    "/portfolio/:path*",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ],
};
