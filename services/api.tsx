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
  
  return [
  { id: '1', name: 'Comm!', description: 'La communauté de..', image: 'https://www.les-transferts.com/wp-content/uploads/2025/07/Une-pepite-de-Chelsea-veut-rivaliser-avec-Lamine-Yamal-pour-le-Ballon-dOr-%C2%A9Alamy.webp' },
  { id: '2', name: 'LeBron23', description: 'LeBron James', image: 'https://www.plfrance.fr/wp-content/uploads/2024/08/ICONSPORT_234427_0014.jpg' },
  { id: '3', name: 'M10', description: 'Lionel Messi', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/250px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg' },
  { id: '4', name: 'KillianSpeed', description: 'Kylian Mbappé', image: 'https://www.lequipe.fr/_medias/img-photo-jpg/lamine-yamal-warren-zaire-emery-et-kobbie-mainoo-l-equipe/1500000001977444/320:13,1262:955-828-828-75/227de' },
  { id: '5', name: 'JujuBike', description: 'Julien Dupont – VTT freestyle', image: 'data:image/jpeg;base64,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' },
  { id: '6', name: 'ZionDunk', description: 'Zion Williamson', image: 'https://senego.com/wp-content/uploads/2024/03/La-GFA-en-mission-pour-attirer-le-jeune-talent-Mainoo-du-cote-ghaneen_thumbnail.jpg' },
  { id: '7', name: 'SerenaSmash', description: 'Serena Williams', image: 'https://football-anglais.com/wp-content/uploads/2024/10/Arda-guler-turquie-1-1024x682.webp' },
  { id: '8', name: 'NoahServe', description: 'Noah Roland – Tennis junior', image: 'https://images2.minutemediacdn.com/image/upload/c_crop,w_6552,h_3685,x_0,y_129/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/90min_fr_international_web/01jg6eqb8eak6spncx6p.jpg' },
  { id: '9', name: 'AyaFighter', description: 'Aya Shibata – MMA Japon', image: 'https://www.radiofrance.fr/s3/cruiser-production-eu3/2024/01/e714e1f5-69d1-4129-bec0-dd1cdfc8f1c1/640x340_sc_000-34ey94q.jpg' },
  { id: '10', name: 'YassirSprint', description: 'Yassir Ben Khaled – Sprinteur U23', image: 'https://cdn-s-www.ledauphine.com/images/17857083-8DFA-4788-9339-475AF297C18A/NW_raw/lamine-yamal-photo-sipa-1746872986.jpg' },
];
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