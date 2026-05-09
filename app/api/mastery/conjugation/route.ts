import { supabase } from '@/app/utils/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// GET leçons maîtrisées pour un profil
export async function GET(request: NextRequest) {
  try {
    const profileId = request.nextUrl.searchParams.get('profileId');

    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('mastery_conjugation')
      .select('lesson_id')
      .eq('profile_id', profileId);

    if (error) throw error;

    return NextResponse.json(data.map(item => item.lesson_id));
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST marquer une leçon comme maîtrisée
export async function POST(request: NextRequest) {
  try {
    const { profileId, lessonId } = await request.json();

    if (!profileId || !lessonId) {
      return NextResponse.json({ error: 'Profile ID and Lesson ID are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('mastery_conjugation')
      .insert([{ profile_id: profileId, lesson_id: lessonId }])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE retirer une leçon maîtrisée
export async function DELETE(request: NextRequest) {
  try {
    const { profileId, lessonId } = await request.json();

    if (!profileId || !lessonId) {
      return NextResponse.json({ error: 'Profile ID and Lesson ID are required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('mastery_conjugation')
      .delete()
      .eq('profile_id', profileId)
      .eq('lesson_id', lessonId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
