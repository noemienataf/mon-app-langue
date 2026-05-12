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

// GET mots ajoutés pour une liste d'un utilisateur
export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    const listId = request.nextUrl.searchParams.get('listId');
    const languageProfileId = request.nextUrl.searchParams.get('languageProfileId');

    if (!listId) {
      return NextResponse.json({ error: 'List ID is required' }, { status: 400 });
    }

    // Si l'utilisateur est connecté et fournit un languageProfileId, filtrer par celui-ci
    if (userId && languageProfileId) {
      const isOwner = await verifyLanguageProfileOwnership(userId, languageProfileId);
      if (!isOwner) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const { data, error } = await supabaseAdmin
        .from('custom_vocabulary')
        .select('*')
        .eq('list_id', listId)
        .eq('language_profile_id', languageProfileId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return NextResponse.json(data || []);
    }

    // Si pas d'utilisateur, retourner un tableau vide (pour l'API publique)
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST ajouter un mot
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listId, hebrew, french, languageProfileId } = await request.json();

    if (!listId || !hebrew || !french || !languageProfileId) {
      return NextResponse.json(
        { error: 'listId, hebrew, french, and languageProfileId are required' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur possède ce language_profile
    const isOwner = await verifyLanguageProfileOwnership(userId, languageProfileId);
    if (!isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data, error } = await supabaseAdmin
      .from('custom_vocabulary')
      .insert([
        {
          list_id: listId,
          hebrew,
          french,
          language_profile_id: languageProfileId,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE supprimer un mot
export async function DELETE(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, languageProfileId } = await request.json();

    if (!id || !languageProfileId) {
      return NextResponse.json(
        { error: 'Word ID and languageProfileId are required' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur possède ce language_profile
    const isOwner = await verifyLanguageProfileOwnership(userId, languageProfileId);
    if (!isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Vérifier que le mot appartient à ce language_profile
    const { data: word, error: fetchError } = await supabaseAdmin
      .from('custom_vocabulary')
      .select('id')
      .eq('id', id)
      .eq('language_profile_id', languageProfileId)
      .single();

    if (fetchError || !word) {
      return NextResponse.json({ error: 'Word not found' }, { status: 404 });
    }

    const { error } = await supabaseAdmin
      .from('custom_vocabulary')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
