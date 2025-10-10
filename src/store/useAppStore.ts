import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Coords {
  lat: number;
  lon: number;
}

interface AppState {
  city: string;
  coords: Coords | null;
  setCity: (newCity: string) => void;
  setCoords: (coords: Coords | null) => void;
  clearCoords: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      city: "",
      coords: null,
      setCity: (newCity) => set({ city: newCity, coords: null }),
      setCoords: (coords: Coords | null) => set({ coords: coords, city: "" }),
      clearCoords: () => set({ coords: null }),
    }),
    {
      name: "weather-app-storage",
    }
  )
);
