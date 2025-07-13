import axios from 'axios';

const API_BASE = 'https://risk-arena.lh/api';

const axiosInstance = (token?: string) =>
  axios.create({
    baseURL: API_BASE,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

/* -------------------- USER -------------------- */
export const createUser = (data: { first_name: string; last_name: string; email: string }) =>
  axiosInstance().post('/user/', data);

export const getUser = (userId: string, token: string) =>
  axiosInstance(token).get(`/user/${userId}`);

/* -------------------- COMMUNITY -------------------- */
export const createCommunity = (
  data: { name: string; description: string; creatorId: string; tokenId: string },
  token: string
) => axiosInstance(token).post('/communities', data);

export const getCommunity = (communityId: string, token: string) =>
  axiosInstance(token).get(`/communities/${communityId}`);

export const getCommunities = (token: string) =>
  axiosInstance(token).get('/communities');

export const updateCommunity = (communityId: string, data: any, token: string) =>
  axiosInstance(token).put(`/communities/${communityId}`, data);

/* -------------------- FAN TOKEN -------------------- */
export const createFanToken = (
  data: { name: string; symbol: string; price: number; totalSupply: number; communityId: string },
  token: string
) => axiosInstance(token).post('/fantokens', data);

export const getFanTokens = (token: string) => axiosInstance(token).get('/fantokens');

export const getFanToken = (tokenId: string, token: string) =>
  axiosInstance(token).get(`/fantokens/${tokenId}`);

export const updateFanToken = (tokenId: string, data: any, token: string) =>
  axiosInstance(token).put(`/fantokens/${tokenId}`, data);

/* -------------------- PAYMENT -------------------- */
export const createPayment = (
  data: {
    userId: string;
    tokenId: string;
    amount: number;
    price: number;
    type: string;
    currency: string;
  },
  token: string
) => axiosInstance(token).post('/payments', data);

export const getPayments = (userId: string, token: string) =>
  axiosInstance(token).get(`/payments/${userId}`);

/* -------------------- USER FAN TOKENS -------------------- */
export const createUserFanToken = (
  data: { userId: string; tokenId: string; amount: number },
  token: string
) => axiosInstance(token).post('/user-fantokens', data);

export const getUserFanTokens = (userId: string, token: string) =>
  axiosInstance(token).get(`/user-fantokens/${userId}`);

/* -------------------- COMMUNITY POSTS -------------------- */
export const createPost = (
  data: {
    creatorId: string;
    communityId: string;
    type: string;
    contentUrl?: string;
    content: string;
  },
  token: string
) => axiosInstance(token).post('/posts', data);

export const getCommunityPosts = (communityId: string, token: string) =>
  axiosInstance(token).get(`/posts/${communityId}`);

export const updatePost = (postId: string, data: any, token: string) =>
  axiosInstance(token).put(`/posts/${postId}`, data);

/* -------------------- AUTH -------------------- */
export const createToken = (
  data: { userId: string; secret: string }
) => axiosInstance().post('/auth/token', data);
