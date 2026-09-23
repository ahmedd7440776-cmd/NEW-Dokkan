import { create } from "zustand";

export const useFilterStore = create((set) => ({
  searchQuery: "",
  selectedCategory: "all",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category ?? 'all' }),
}));
