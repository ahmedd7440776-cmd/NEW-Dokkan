import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist((set) => ({
    user: null, // countans user's info whither if its authenticated or just a geast
    isAuthenticated: false,

    // 1- login function
    login: (userData) =>
      set({
        user: userData,
        isAuthenticated: true,
      }),

    // 2- logout
    logout: () =>
      set({
        user: null,
        isAuthenticated: false,
      }),

    name: "auth-storage",

  })),
);


