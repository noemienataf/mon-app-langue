import { NextRequest, NextResponse } from 'next/server';

// Le middleware est minimaliste car on ne peut pas accéder à localStorage en server-side
// La vérification d'authentification se fait côté client dans les pages

export function middleware(request: NextRequest) {
  // Laisser passer toutes les requêtes
  // Les pages géreront la vérification d'authentification côté client
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Ne matcher que les routes non-API et non-static
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
