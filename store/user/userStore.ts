import { create } from "zustand";

interface UserState {
  name: string;
  setName: (name: string) => void;
  clearName: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: "",
  setName: (name) => set({ name }),
  clearName: () => set({ name: "" }),
}));
