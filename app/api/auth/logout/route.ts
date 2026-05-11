import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // La déconnexion côté client supprime juste le token du localStorage
    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la déconnexion' },
      { status: 500 }
    );
  }
}
