import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // La déconnexion côté client supprime juste le token du localStorage
    // Ce endpoint confirme la déconnexion
    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
