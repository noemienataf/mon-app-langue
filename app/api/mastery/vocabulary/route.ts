import { supabaseAdmin } from '@/app/utils/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

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

// Vérifier que l'utilisateur possède le language_profile
async function verifyLanguageProfileOwnership(
  userId: string,
  languageProfileId: string
): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from('language_profiles')
    .select('id')
    .eq('id', languageProfileId)
    .eq('user_id', userId)
    .single();

  return !!data && !error;
}

// GET listes maîtrisées pour un profil de langue
export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    const languageProfileId = request.nextUrl.searchParams.get('languageProfileId');

    if (!userId || !languageProfileId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Vérifier que l'utilisateur possède ce language_profile
    const isOwner = await verifyLanguageProfileOwnership(userId, languageProfileId);
    if (!isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data, error } = await supabaseAdmin
      .from('mastery_vocabulary')
      .select('list_id')
      .eq('language_profile_id', languageProfileId);

    if (error) throw error;

    return NextResponse.json(data.map(item => item.list_id));
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST marquer une liste comme maîtrisée
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { languageProfileId, listId } = await request.json();

    if (!languageProfileId || !listId) {
      return NextResponse.json(
        { error: 'Language Profile ID and List ID are required' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur possède ce language_profile
    const isOwner = await verifyLanguageProfileOwnership(userId, languageProfileId);
    if (!isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data, error } = await supabaseAdmin
      .from('mastery_vocabulary')
      .insert([{ language_profile_id: languageProfileId, list_id: listId }])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE retirer une liste maîtrisée
export async function DELETE(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { languageProfileId, listId } = await request.json();

    if (!languageProfileId || !listId) {
      return NextResponse.json(
        { error: 'Language Profile ID and List ID are required' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur possède ce language_profile
    const isOwner = await verifyLanguageProfileOwnership(userId, languageProfileId);
    if (!isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { error } = await supabaseAdmin
      .from('mastery_vocabulary')
      .delete()
      .eq('language_profile_id', languageProfileId)
      .eq('list_id', listId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
