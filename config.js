const rawApi = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/';
const API_URL = rawApi.endsWith('/') ? rawApi : `${rawApi}/`;
const IMAGE_HOST = API_URL.replace(/\/$/, '');

const Config = {
  API_URL,
  IMAGE_HOST,
  AUTH_TOKEN_KEY: 'authentication',
  USER_KEY: 'toeic-user',
  EXAM_KEY: 'exam',
  WALLET_KEY: 'wallet',
};

export default Config;
