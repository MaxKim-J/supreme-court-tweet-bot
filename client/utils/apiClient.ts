import axios, { AxiosInstance, AxiosResponse } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
