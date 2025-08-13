import { MMKV } from "react-native-mmkv"
import { getSudoku } from "sudoku-gen"
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type Pointer = { index: number; row: number; col: number } | null
type GameStatus = null | "won" | "lost" | "playing"

export interface GameStore {
  difficulty: Difficulty | undefined
  puzzle: string[] | undefined
  originalPuzzle: string[] | undefined
  solution: string[] | undefined
  pointer: Pointer
  timer: number
  errorCount: number
  isPaused: boolean
  gameStatus: GameStatus
  hasHydrated: boolean // NEW - hydration flag

  setPuzzle: (puzzle: string[]) => void
  setOriginalPuzzle: (puzzle: string[]) => void
  setPointer: (index: number) => void
  setGameStatus: (status: GameStatus) => void
  clearPointer: () => void
  tick: () => void
  pause: () => void
  resume: () => void
  newGame: (difficulty: Difficulty) => void
  reset: () => void
  incrementErrorCount: () => void
  setHasHydrated: (state: boolean) => void // NEW - set hydration flag
}

// MMKV instance
const storage = new MMKV({
  id: "sudoku-storage",
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

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      difficulty: undefined,
      puzzle: undefined,
      originalPuzzle: undefined,
      solution: undefined,
      pointer: null,
      timer: 0,
      errorCount: 0,
      isPaused: false,
      gameStatus: null,
      hasHydrated: false,
      playing: false,

      setPuzzle: (puzzle) => set({ puzzle }),
      setOriginalPuzzle: (puzzle) => set({ originalPuzzle: puzzle }),

      setPointer: (index) => {
        const row = Math.floor(index / 9)
        const col = index % 9
        set({ pointer: { index, row, col } })
      },

      setGameStatus: (status) => set({ gameStatus: status }),
      clearPointer: () => set({ pointer: null }),

      tick: () => {
        if (!get().isPaused && get().gameStatus === "playing") {
          set((state) => ({ timer: state.timer + 1 }))
        }

        // if ((get().puzzle && get().solution) && (get().puzzle === get().solution)) {
        //   get().pause()get().
        //   set({ gameStatus: "won" })
        // }
      },

      pause: () => set({ isPaused: true }),
      resume: () => set({ isPaused: false }),

      newGame: (difficulty) => {
        const newBoard = getSudoku(difficulty)
        set({
          difficulty,
          puzzle: [...newBoard.puzzle],
          originalPuzzle: [...newBoard.puzzle],
          solution: [...newBoard.solution],
          pointer: null,
          timer: 0,
          errorCount: 0,
          isPaused: true,
          gameStatus: "playing",
        })
      },

      reset: () => {
        set((state) => ({
          puzzle: state.originalPuzzle,
          pointer: null,
          timer: 0,
          errorCount: 0,
          isPaused: true,
          gameStatus: "playing",
        }))
      },

      incrementErrorCount: () => set((state) => ({ errorCount: state.errorCount + 1 })),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "justanothersudokuapp-gamestore",
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (state) => ({
        difficulty: state.difficulty,
        puzzle: state.puzzle,
        originalPuzzle: state.originalPuzzle,
        solution: state.solution,
        pointer: state.pointer,
        timer: state.timer,
        errorCount: state.errorCount,
        isPaused: state.isPaused,
        gameStatus: state.gameStatus,
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
export const useGameStoreHydration = () => useGameStore((state) => state.hasHydrated)
