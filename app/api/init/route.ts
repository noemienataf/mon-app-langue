import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabaseServer';

export async function GET(request: NextRequest) {
  try {
    const diagnostics: any = {
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
      supabase_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'configured' : 'missing',
      tables: {},
    };

    // Check if profiles table exists and has data
    try {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .limit(1);
      diagnostics.tables.profiles = error ? `Error: ${error.message}` : 'OK';
    } catch (e: any) {
      diagnostics.tables.profiles = `Error: ${e.message}`;
    }

    // Check if language_profiles table exists
    try {
      const { data, error } = await supabaseAdmin
        .from('language_profiles')
        .select('*')
        .limit(1);
      diagnostics.tables.language_profiles = error ? `Error: ${error.message}` : 'OK';
    } catch (e: any) {
      diagnostics.tables.language_profiles = `Error: ${e.message}`;
    }

    return NextResponse.json(diagnostics);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Diagnostic error' },
      { status: 500 }
    );
  }
}
