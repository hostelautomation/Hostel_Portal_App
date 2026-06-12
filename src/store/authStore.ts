import { create } from "zustand";

import {
  getSession,
  clearSession,
} from "@/shared/storage/session";

import {
  clearTokens,
} from "@/shared/storage/tokens";

export interface User {
  id: string;
  displayName: string;
  email: string;
  role: string;
  profilePicture?: string;
}

interface AuthState {
  user: User | null;
  role: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User) => void;
  setRole: (role: string) => void;
  setLoading: (loading: boolean) => void;

  login: (user: User) => void;
  logout: () => Promise<void>;

  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({
      user,
    }),

  setRole: (role) =>
    set({
      role,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  login: (user) =>
    set({
      user,
      role: user.role,
      isAuthenticated: true,
      isLoading: false,
    }),

  logout: async () => {
    try {
      await clearSession();
      await clearTokens();
    } catch (error) {
      console.error(
        "Failed to clear auth data:",
        error
      );
    }

    set({
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  hydrate: async () => {
    try {
      const session = await getSession();

      console.log(
        "HYDRATED SESSION:",
        session
      );

      if (session) {
        set({
          user: session.user,
          role: session.role,
          isAuthenticated: true,
          isLoading: false,
        });

        return;
      }

      set({
        user: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error(
        "Failed to hydrate auth state:",
        error
      );

      set({
        user: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));