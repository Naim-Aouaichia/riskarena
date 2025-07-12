// src/services/apiService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export type Community = {
  id: string;
  name: string;
  description: string;
  image: string; // URI renvoyée par l'API (ex: base64 ou lien)
};

export async function fetchCommunities(): Promise<Community[]> {
  const response = await axios.get<Community[]>(`${API_BASE_URL}/communities`);
  return response.data;
}

export type CommunityDetail = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  members: number;
  tokenSymbol: string;
  tokenPrice: string;
  events?: string[]; // pour calendar
  // autres champs si besoin
};

export async function fetchCommunityById(id: string): Promise<CommunityDetail> {
  const resp = await axios.get<CommunityDetail>(`${API_BASE_URL}/community/${id}`);
  return resp.data;
}

export async function login(username: string, password: string) {
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: error.error };
    }

    return await res.json(); // { id, username, accessToken }
  } catch (err) {
    
    return { error: "err.message" };
  }
}

export async function register(email: string, password: string) {
  const res = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erreur serveur');
  }
  return res.json(); // { id, email, accessToken }
}

export async function passwordReset(email: string): Promise<void> {
  const res = await fetch('http://localhost:3000/api/password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || 'Erreur lors de la demande');
  }
}