import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Routes publiques (accessibles sans authentification)
const PUBLIC_ROUTES = ['/auth/login', '/auth/signup'];

// Routes protégées (nécessitent une authentification)
const PROTECTED_ROUTES = ['/', '/vocabulary', '/grammar', '/conjugation'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Récupérer le token du localStorage via cookies
  // Note: Dans un middleware Next.js, on ne peut pas accéder directement à localStorage
  // Le token sera transmis via headers par le client
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];

  // Vérifier si la route est publique
  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

  // Vérifier si la route est protégée
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));

  // Si c'est une route protégée
  if (isProtectedRoute) {
    // Vérifier si le token est valide
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Si c'est une route publique et l'utilisateur est déjà connecté
  if (isPublicRoute && token) {
    try {
      jwt.verify(token, JWT_SECRET);
      // Utilisateur est authentifié, rediriger vers home
      return NextResponse.redirect(new URL('/', request.url));
    } catch {
      // Token invalide, laisser l'utilisateur accéder à la route publique
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Matcher les routes sauf:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
