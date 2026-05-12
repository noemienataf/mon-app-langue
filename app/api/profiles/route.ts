import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Langues disponibles
const AVAILABLE_LANGUAGES = [
  { code: 'hebrew', name: 'Hébreu', flag: '🇮🇱' },
  { code: 'portuguese', name: 'Portugais', flag: '🇧🇷' },
];

// GET - Liste des langues disponibles
export async function GET() {
  try {
    return NextResponse.json(AVAILABLE_LANGUAGES);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
