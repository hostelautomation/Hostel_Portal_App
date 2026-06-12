import axios from "axios";

import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "@/shared/storage/tokens";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    console.log("REQUEST:", config.url);
    console.log("TOKEN EXISTS:", !!token);

    if (token) {
      console.log(
        "AUTH HEADER:",
        `Bearer ${token.substring(0, 30)}...`
      );

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          await getRefreshToken();

        if (!refreshToken) {
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${API_URL}/auth/mobile/refresh`,
          {
            refreshToken,
          }
        );

        const newAccessToken =
          response.data.token;

        await saveTokens(
          newAccessToken,
          refreshToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);