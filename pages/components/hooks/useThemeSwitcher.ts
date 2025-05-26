import { useThemeStore } from "@/store/theme/themeStore";
import { THEME_TYPES } from "@/types/themeTypes";
import { useEffect } from "react";

export const useThemeSwitcher = () => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);

  const applyThemePreference = (selectedTheme: string) => {
    const { THEME_DARK, THEME_LIGHT } = THEME_TYPES;
    const root = window.document.documentElement;
    const isDark = selectedTheme === THEME_DARK;
    root.classList.remove(isDark ? THEME_LIGHT : THEME_DARK);
    root.classList.add(selectedTheme);
  };

  useEffect(() => {
    applyThemePreference(theme);
  }, [theme, applyThemePreference]);

  return { toggleTheme, theme };
};
export default function Other() {
  return;
}
