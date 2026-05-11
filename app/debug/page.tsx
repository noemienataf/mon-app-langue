'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Récupère le token du localStorage
    const token = localStorage.getItem('auth_token');
    const decodedToken = token ? decodeToken(token) : null;

    // Récupère les infos de la base de données
    const fetchDebugInfo = async () => {
      try {
        const response = await fetch('/api/debug', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const dbData = await response.json();

        setData({
          localStorage: {
            token: token || 'NOT FOUND',
            decodedToken,
          },
          database: dbData,
        });
      } catch (error) {
        setData({ error: String(error) });
      }
    };

    fetchDebugInfo();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🔍 Debug Info</h1>
      <pre className="bg-white p-4 rounded border border-gray-300 overflow-auto max-h-96">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

function decodeToken(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return { error: 'Invalid token format' };

    // Décode le payload base64
    const payload = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const decoded = JSON.parse(
      atob(payload)
    );
    return decoded;
  } catch (error) {
    return { error: String(error) };
  }
}
