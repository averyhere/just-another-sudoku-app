import { MMKV } from "react-native-mmkv"
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface SettingsStore {
  defaultDifficulty: Difficulty
  setDefaultDifficulty: (difficulty: Difficulty) => void
  hasHydrated: boolean // NEW - hydration flag
  setHasHydrated: (state: boolean) => void // NEW - set hydration flag
}

// MMKV instance
const storage = new MMKV({
  id: "sudoku-storage-settings",
})

// Adapter to make MMKV work with zustand's createJSONStorage
const mmkvStorage = {
  setItem: (name: string, value: string) => {
    storage.set(name, value)
  },
  getItem: (name: string) => {
    const value = storage.getString(name)
    return value ?? null
  },
  removeItem: (name: string) => {
    storage.delete(name)
  },
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      defaultDifficulty: "easy",
      setDefaultDifficulty: (difficulty: Difficulty) => {
        set({ defaultDifficulty: difficulty })
      },
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "just-another-sudoku-app-settingsstore",
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        defaultDifficulty: state.defaultDifficulty,
      }),
      onRehydrateStorage: () => (state) => {
        // Called after hydration
        state?.setHasHydrated(true)
      },
    },
  ),
)

/**
 * Hook to track hydration status.
 * Usage:
 *   const hasHydrated = useSudokuHydration();
 *   if (!hasHydrated) return <LoadingScreen />;
 */
export const useSettingsStoreHydration = () => useSettingsStore((state) => state.hasHydrated)
