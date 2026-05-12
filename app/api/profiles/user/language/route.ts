import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabaseServer';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded: any = jwt.verify(token, JWT_SECRET);
    console.log('Decoded JWT token:', decoded);
    const { language } = await request.json();

    if (!language) {
      return NextResponse.json({ error: 'Language required' }, { status: 400 });
    }

    // Vérifier si le profil de langue existe déjà
    const { data: existing } = await supabaseAdmin
      .from('language_profiles')
      .select('*')
      .eq('user_id', decoded.userId)
      .eq('language', language);

    if (existing && existing.length > 0) {
      return NextResponse.json(existing[0]);
    }

    // Créer un nouveau profil de langue
    console.log('Creating language profile for user:', decoded.userId, 'language:', language);
    const languageProfileId = uuidv4();
    const createdAt = new Date().toISOString();

    const { error } = await supabaseAdmin
      .from('language_profiles')
      .insert([
        {
          id: languageProfileId,
          user_id: decoded.userId,
          language,
          created_at: createdAt,
        },
      ]);

    if (error) {
      console.error('Insert error:', error);
      throw error;
    }

    // Retourner l'objet créé
    const languageProfile = {
      id: languageProfileId,
      user_id: decoded.userId,
      language,
      created_at: createdAt,
    };

    console.log('Language profile created:', languageProfile);
    return NextResponse.json(languageProfile, { status: 201 });
  } catch (error: any) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur' },
      { status: 500 }
    );
  }
}
