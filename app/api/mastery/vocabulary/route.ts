import { supabase } from '@/app/utils/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// GET listes maîtrisées pour un profil
export async function GET(request: NextRequest) {
  try {
    const profileId = request.nextUrl.searchParams.get('profileId');

    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('mastery_vocabulary')
      .select('list_id')
      .eq('profile_id', profileId);

    if (error) throw error;

    return NextResponse.json(data.map(item => item.list_id));
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST marquer une liste comme maîtrisée
export async function POST(request: NextRequest) {
  try {
    const { profileId, listId } = await request.json();

    if (!profileId || !listId) {
      return NextResponse.json({ error: 'Profile ID and List ID are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('mastery_vocabulary')
      .insert([{ profile_id: profileId, list_id: listId }])
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
    const { profileId, listId } = await request.json();

    if (!profileId || !listId) {
      return NextResponse.json({ error: 'Profile ID and List ID are required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('mastery_vocabulary')
      .delete()
      .eq('profile_id', profileId)
      .eq('list_id', listId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
