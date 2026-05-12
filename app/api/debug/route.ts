import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabaseServer';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

interface JwtTokenPayload {
  id?: string;
  email?: string;
  [key: string]: any;
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    let decodedToken: JwtTokenPayload | null = null;
    if (token) {
      try {
        decodedToken = jwt.verify(token, JWT_SECRET) as JwtTokenPayload;
      } catch (e) {
        decodedToken = { error: 'Invalid token' } as JwtTokenPayload;
      }
    }

    // Récupère tous les utilisateurs
    const { data: users, error: usersError } = await supabaseAdmin
      .from('profiles')
      .select('*');

    // Récupère tous les profils de langue
    const { data: languageProfiles, error: langError } = await supabaseAdmin
      .from('language_profiles')
      .select('*');

    // Essaie une insertion de test
    let testInsertResult = null;
    if (decodedToken && decodedToken.id) {
      const { data: testInsert, error: testInsertError } = await supabaseAdmin
        .from('language_profiles')
        .insert([
          {
            user_id: decodedToken.id,
            language: 'test_language',
          },
        ])
        .select();

      testInsertResult = {
        success: !testInsertError,
        data: testInsert,
        error: testInsertError?.message || testInsertError,
      };
    }

    return NextResponse.json({
      decodedToken,
      totalUsers: users?.length || 0,
      users: users || [],
      totalLanguageProfiles: languageProfiles?.length || 0,
      languageProfiles: languageProfiles || [],
      testInsert: testInsertResult,
      errors: {
        users: usersError?.message,
        languages: langError?.message,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
