'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!username || !password) {
        setError('Remplis username et password');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Erreur de connexion');
        setLoading(false);
        return;
      }

      // Sauvegarde le token et redirige
      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      router.push('/');
    } catch (err) {
      setError('Erreur');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-50 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-600 mb-2 text-center">Connexion</h1>
        <p className="text-gray-600 text-center mb-6">Connecte-toi pour continuer</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ton nom d'utilisateur"
              className="w-full border-2 border-gray-300 rounded px-3 py-2 text-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ton mot de passe"
              className="w-full border-2 border-gray-300 rounded px-3 py-2 text-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
          >
            {loading ? 'Connexion en cours...' : 'Connexion'}
          </button>
        </form>

        <p className="text-gray-600 text-center mt-6">
          Pas encore de compte?{' '}
          <Link href="/auth/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
            Inscris-toi
          </Link>
        </p>
      </div>
    </div>
  );
}
