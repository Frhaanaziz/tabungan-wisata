import axios from "axios";
import { env } from "@/env";

export function getBackendApi(token?: string, params?: object) {
  return axios.create({
    baseURL: env.BACKEND_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    params,
  });
}

export function getApi(token: string) {
  return axios.create({
    baseURL: "/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
}
