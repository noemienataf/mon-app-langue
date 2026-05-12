import { supabaseAdmin } from '@/app/utils/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

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

    // Vérifier si l'utilisateur existe déjà
    const { data: existingUsers } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('username', username);

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Ce username existe déjà' },
        { status: 400 }
      );
    }

    // Hash le password
    const passwordHash = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur
    const userId = uuidv4();
    console.log('Creating user with ID:', userId);
    const { data: newUser, error } = await supabaseAdmin
      .from('profiles')
      .insert([
        {
          id: userId,
          username,
          password_hash: passwordHash,
        },
      ])
      .select();

    console.log('Insert result:', { newUser, error });
    if (error) {
      console.error('Database error on insert:', error);
      throw error;
    }

    if (!newUser || newUser.length === 0) {
      console.error('No user returned after insert');
      throw new Error('Failed to create user');
    }

    const user = newUser[0];
    console.log('User created:', user);

    // Créer un token JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Inscription réussie',
        token,
        user: { id: user.id, username: user.username }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erreur signup:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}
