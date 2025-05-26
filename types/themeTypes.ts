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

export const columnInfo: Record<TaskStatus, { label: string; color: string }> =
  {
    pendiente: { label: "Pendiente", color: "#FFD700" },
    en_progreso: { label: "En progreso", color: "#1E90FF" },
    completada: { label: "Completada", color: "#32CD32" },
  } as const;

export const buttonClass =
  "flex w-full justify-center rounded-md bg-black dark:bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer ";
export const inputClass =
  "block w-full rounded-md bg-gray-100 px-3 py-1.5 shadow-lg text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6";

export const style_table_head_row =
  "text-left font-medium text-sm text-gray-darkest dark:text-pd-light text-center sticky top-0 bg-pd-bg dark:bg-pd-dark z-20";
export const style_table_head_cell = "px-6 py-3 tracking-wider dark:text-white";
export const style_table_body_row =
  "text-sm text-gray-darkest dark:text-pd-light hover:bg-pd-bg dark:hover:bg-pd-dark text-center px-3";
export const style_table_body_cell = "px-3 py-3 whitespace-nowrap";
