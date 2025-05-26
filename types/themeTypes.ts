export const THEME_TYPES = {
  THEME_DARK: "dark",
  THEME_LIGHT: "light",
};

export interface themeStore {
  theme: string;
  toggleTheme: () => void;
}
export type TaskStatus = "pendiente" | "en_progreso" | "completada";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: string;
}

export const states: Array<{
  id: string;
  name: TaskStatus;
  label: string;
  color: string;
}> = [
  { id: "1", name: "pendiente", label: "Pendiente", color: "#FFD700" },
  { id: "2", name: "en_progreso", label: "En progreso", color: "#1E90FF" },
  { id: "3", name: "completada", label: "Completada", color: "#32CD32" },
];
