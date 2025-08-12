import { MMKV } from "react-native-mmkv"
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type EntryType = {
  date: Date
  difficulty: string | Difficulty
  puzzle: string[]
  originalPuzzle: string[]
  solution: string[]
  timer: number
  errorCount: number
  gameStatus: string
}

export interface HistoryStore {
  entries: EntryType[]
  addEntry: (entry: EntryType) => void
  seed: () => void
  clearHistory: () => void
  hasHydrated: boolean // NEW - hydration flag
  setHasHydrated: (state: boolean) => void // NEW - set hydration flag
}

const sampleEntries: EntryType[] = [
  {
    date: new Date(),
    difficulty: "easy",
    puzzle: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    originalPuzzle: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    solution: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    timer: 1000,
    errorCount: 0,
    gameStatus: "won",
  },
  {
    date: new Date(),
    difficulty: "medium",
    puzzle: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    originalPuzzle: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    solution: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    timer: 2000,
    errorCount: 1,
    gameStatus: "won",
  },
  {
    date: new Date(),
    difficulty: "medium",
    puzzle: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    originalPuzzle: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    solution: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    timer: 2000,
    errorCount: 5,
    gameStatus: "lost",
  },
  {
    date: new Date(),
    difficulty: "hard",
    puzzle: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    originalPuzzle: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    solution: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    timer: 3000,
    errorCount: 2,
    gameStatus: "won",
  },
]

// MMKV instance
const storage = new MMKV({
  id: "sudoku-storage-history",
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

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry: EntryType) => {
        set((state) => ({ entries: [...state.entries, entry] }))
      },
      seed: () => {
        set((state) => ({ entries: [...state.entries, ...sampleEntries] }))
      },
      clearHistory: () => set({ entries: [] }),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "justanothersudoku-historystore",
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        entries: state.entries,
        seed: state.seed,
        clearHistory: state.clearHistory,
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
export const useHistoryStoreHydration = () => useHistoryStore((state) => state.hasHydrated)
