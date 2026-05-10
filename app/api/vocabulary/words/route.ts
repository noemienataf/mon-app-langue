import { supabase } from '@/app/utils/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// GET mots ajoutés pour une liste
export async function GET(request: NextRequest) {
  try {
    const listId = request.nextUrl.searchParams.get('listId');

    if (!listId) {
      return NextResponse.json({ error: 'List ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('custom_vocabulary')
      .select('*')
      .eq('list_id', listId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST ajouter un mot
export async function POST(request: NextRequest) {
  try {
    const { listId, hebrew, french, profileId } = await request.json();

    if (!listId || !hebrew || !french || !profileId) {
      return NextResponse.json(
        { error: 'listId, hebrew, french, and profileId are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('custom_vocabulary')
      .insert([
        {
          list_id: listId,
          hebrew,
          french,
          profile_id: profileId,
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
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Word ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('custom_vocabulary')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
