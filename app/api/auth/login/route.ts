import { supabaseAdmin } from '@/app/utils/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username et password requis' },
        { status: 400 }
      );
    }

    // Chercher l'utilisateur
    const { data: users, error } = await supabaseAdmin
      .from('profiles')
      .select('id, username, password_hash')
      .eq('username', username);

    if (error || !users || users.length === 0) {
      return NextResponse.json(
        { error: 'Username ou password incorrect' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Vérifier le password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Username ou password incorrect' },
        { status: 401 }
      );
    }

    // Créer un token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Connexion réussie',
        token,
        user: { id: user.id, username: user.username }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur login:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
