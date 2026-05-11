import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET(request: NextRequest) {
  try {
    // Récupérer le token depuis l'Authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { user: null },
        { status: 200 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    return NextResponse.json(
      {
        user: {
          id: decoded.userId,
          username: decoded.username
        }
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { user: null },
      { status: 200 }
    );
  }
}
