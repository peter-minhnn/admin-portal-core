import axios, { AxiosResponse } from 'axios';
import { getLocale, getToken } from '@/actions/cookies.action';

const globalAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

globalAxiosInstance.interceptors.request.use(async (config) => {
  const token = await getToken();
  const locale = await getLocale();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Accept-Language'] = locale ?? 'vi';
  return config;
});

globalAxiosInstance.interceptors.response.use(function (
  response: AxiosResponse
) {
  return response;
});

export default globalAxiosInstance;
