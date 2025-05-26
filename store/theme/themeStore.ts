import { THEME_TYPES, themeStore } from "@/types/themeTypes";
import { StateCreator } from "zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const { THEME_LIGHT, THEME_DARK } = THEME_TYPES;

const toggleTheme: StateCreator<themeStore> = (set) => ({
  theme: THEME_LIGHT,
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT,
    })),
});

export const useThemeStore = create<themeStore>()(
  persist(toggleTheme, { name: "theme-store" })
);
