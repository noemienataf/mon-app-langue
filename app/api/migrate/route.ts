import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/utils/supabaseServer';

export async function GET(request: NextRequest) {
  try {
    // Vérifier le secret d'admin
    const secret = request.nextUrl.searchParams.get('secret');
    const ADMIN_SECRET = process.env.ADMIN_MIGRATE_SECRET || 'migrate-admin-secret';

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const migrations = [];

    // Migration 1: Créer la table custom_vocabulary_lists
    try {
      const createTableResult = await supabaseAdmin.rpc('create_custom_vocabulary_lists_table');
      migrations.push({
        name: 'create_custom_vocabulary_lists_table',
        success: true,
        result: createTableResult,
      });
    } catch (e: any) {
      // Si la RPC n'existe pas, on va créer la table directement via SQL
      try {
        // Vérifier si la table existe déjà
        const { error: checkError } = await supabaseAdmin
          .from('custom_vocabulary_lists')
          .select('id')
          .limit(1);

        if (checkError && checkError.message.includes('does not exist')) {
          // Table n'existe pas, on ne peut pas la créer directement via le client
          // Il faudrait le faire via la console Supabase SQL
          migrations.push({
            name: 'create_custom_vocabulary_lists_table',
            success: false,
            error: 'Table creation requires SQL execution in Supabase console',
            sql: `
CREATE TABLE IF NOT EXISTS custom_vocabulary_lists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  language_profile_id UUID NOT NULL REFERENCES language_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(language_profile_id, name)
);
            `,
          });
        } else {
          migrations.push({
            name: 'create_custom_vocabulary_lists_table',
            success: true,
            message: 'Table already exists',
          });
        }
      } catch (e: any) {
        migrations.push({
          name: 'create_custom_vocabulary_lists_table',
          success: false,
          error: e.message,
        });
      }
    }

    return NextResponse.json({
      migrations,
      message: 'Migration check completed. If tables need to be created, use the SQL provided in the Supabase console.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Migration error' },
      { status: 500 }
    );
  }
}
