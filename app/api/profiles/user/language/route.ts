import { supabase } from '@/app/utils/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Langues disponibles
const AVAILABLE_LANGUAGES = ['hebrew', 'portuguese', 'spanish'];

// Extraire le userId du JWT token
function getUserIdFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  try {
    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}

// POST - Créer ou retourner un profil de langue existant
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { language } = await request.json();

    if (!language) {
      return NextResponse.json(
        { error: 'Language is required' },
        { status: 400 }
      );
    }

    if (!AVAILABLE_LANGUAGES.includes(language)) {
      return NextResponse.json(
        { error: 'Invalid language' },
        { status: 400 }
      );
    }

    // Vérifier si le profil existe déjà
    const { data: existingProfile, error: checkError } = await supabase
      .from('language_profiles')
      .select('id, language, created_at')
      .eq('user_id', userId)
      .eq('language', language)
      .single();

    if (!checkError && existingProfile) {
      // Le profil existe déjà, le retourner
      return NextResponse.json(existingProfile, { status: 200 });
    }

    // Créer un nouveau profil
    const profileId = uuidv4();
    const { data: newProfile, error: createError } = await supabase
      .from('language_profiles')
      .insert([
        {
          id: profileId,
          user_id: userId,
          language,
          created_at: new Date().toISOString(),
        },
      ])
      .select('id, language, created_at')
      .single();

    if (createError) throw createError;

    return NextResponse.json(newProfile, { status: 201 });
  } catch (error) {
    console.error('Error creating/selecting language profile:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
