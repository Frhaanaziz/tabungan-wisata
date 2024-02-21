import axios, { CreateAxiosDefaults } from 'axios';
import { env } from '@/env.mjs';

export function getBackendApi(token?: string, params?: object) {
  return axios.create({
    baseURL: env.BACKEND_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    params,
  });
}

export function getStrapiApi(
  params?: object,
  config?: CreateAxiosDefaults<any>
) {
  return axios.create({
    baseURL: `${env.STRAPI_URL}/api`,
    headers: {
      Authorization: `Bearer ${env.STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    params,
    ...config,
  });
}

export function getApi(token: string) {
  return axios.create({
    baseURL: '/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
}
