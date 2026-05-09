import { supabase } from '@/app/utils/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// GET exercices maîtrisés pour un profil
export async function GET(request: NextRequest) {
  try {
    const profileId = request.nextUrl.searchParams.get('profileId');

    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('mastery_exercises')
      .select('exercise_id')
      .eq('profile_id', profileId);

    if (error) throw error;

    return NextResponse.json(data.map(item => item.exercise_id));
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST marquer un exercice comme maîtrisé
export async function POST(request: NextRequest) {
  try {
    const { profileId, exerciseId } = await request.json();

    if (!profileId || !exerciseId) {
      return NextResponse.json({ error: 'Profile ID and Exercise ID are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('mastery_exercises')
      .insert([{ profile_id: profileId, exercise_id: exerciseId }])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE retirer un exercice maîtrisé
export async function DELETE(request: NextRequest) {
  try {
    const { profileId, exerciseId } = await request.json();

    if (!profileId || !exerciseId) {
      return NextResponse.json({ error: 'Profile ID and Exercise ID are required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('mastery_exercises')
      .delete()
      .eq('profile_id', profileId)
      .eq('exercise_id', exerciseId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
