import { supabase } from '@/app/utils/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// GET tous les profils
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST créer un nouveau profil
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Profile name is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert([{ name: name.trim() }])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
