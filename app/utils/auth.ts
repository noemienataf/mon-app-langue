// Session management utilities

const TOKEN_KEY = 'auth_token';
const LANGUAGE_PROFILE_KEY = 'language_profile_id';

export interface User {
  id: string;
  email: string;
}

export interface SessionData {
  user: User;
  token: string;
}

// Récupérer le token du localStorage
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

// Stocker le token et les infos utilisateur
export function setSession(token: string, user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

// Supprimer la session
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LANGUAGE_PROFILE_KEY);
}

// Vérifier si utilisateur est authentifié
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

// Récupérer la session actuelle depuis l'API
export async function getSession(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await fetch('/api/auth/session', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      clearSession();
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
}

// Signup
export async function signup(
  email: string,
  password: string
): Promise<SessionData> {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Signup failed');
  }

  const data = await response.json();
  setSession(data.token, data.user);
  return data;
}

// Login
export async function login(
  email: string,
  password: string
): Promise<SessionData> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  const data = await response.json();
  setSession(data.token, data.user);
  return data;
}

// Logout
export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    clearSession();
  }
}

// Récupérer les profils de langue de l'utilisateur
export async function getLanguageProfiles(): Promise<
  Array<{ id: string; language: string }>
> {
  const token = getToken();
  if (!token) return [];

  try {
    const response = await fetch('/api/profiles/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching language profiles:', error);
    return [];
  }
}

// Créer ou sélectionner un profil de langue
export async function selectLanguage(language: string): Promise<{
  id: string;
  language: string;
}> {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  try {
    const response = await fetch('/api/profiles/user/language', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ language }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to select language');
    }

    const data = await response.json();
    setCurrentLanguageProfile(data.id);
    return data;
  } catch (error) {
    console.error('Error selecting language:', error);
    throw error;
  }
}

// Stocker le profil de langue actuellement sélectionné
export function setCurrentLanguageProfile(languageProfileId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANGUAGE_PROFILE_KEY, languageProfileId);
}

// Récupérer le profil de langue actuellement sélectionné
export function getCurrentLanguageProfile(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(LANGUAGE_PROFILE_KEY);
}
