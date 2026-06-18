/* ============================================================
   Client Supabase — Middleware Next.js
   ============================================================ */

import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Vérifier que les variables d'environnement Supabase sont configurées
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes('placeholder')
  ) {
    // SECURITY FIX: Si Supabase n'est pas configuré, bloquer l'accès à /admin
    if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('error', 'Configuration Supabase manquante');
      return NextResponse.redirect(loginUrl);
    }
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    // IMPORTANT : Ne PAS écrire de logique entre createServerClient et
    // supabase.auth.getUser(). Un simple appel suffit à rafraîchir la session.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Protection de la zone admin (sauf la page de login)
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isLoginPage = request.nextUrl.pathname === '/admin/login';

    if (isAdminRoute && !isLoginPage && !user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isLoginPage && user) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = '/admin';
      return NextResponse.redirect(dashboardUrl);
    }
  } catch {
    // En cas d'erreur Supabase (réseau, config invalide), laisser passer
    // pour ne pas bloquer le développement local
  }

  return supabaseResponse;
}
