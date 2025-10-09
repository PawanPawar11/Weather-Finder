import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  city: string;
  setCity: (newCity: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      city: "",
      setCity: (newCity) => set({ city: newCity }),
    }),
    {
      name: "weather-app-storage",
    }
  )
);
