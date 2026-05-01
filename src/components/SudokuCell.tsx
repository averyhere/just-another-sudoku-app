import * as Haptics from "expo-haptics"
import { TextField } from "@/components/TextField"
import { useGameStore, useGameStoreHydration } from "@/storage/gameStore"
import { useHistoryStore } from "@/storage/historyStore"
import { useAppTheme } from "@/theme/context"

export function SudokuCell({ cellIndex }: { cellIndex: number }) {
  const hasHydrated = useGameStoreHydration()
  const { themed, theme, platform } = useAppTheme()
  const { addEntry } = useHistoryStore()
  const {
    puzzle,
    originalPuzzle,
    pointer,
    difficulty,
    pause,
    solution,
    setPuzzle,
    setPointer,
    incrementErrorCount,
    isPaused,
    timer,
    errorCount,
    resume,
    setGameStatus,
  } = useGameStore()

  if (!hasHydrated || !puzzle) {
    return null
  }

  const cellCoords = {
    row: Math.floor(cellIndex / 9),
    col: cellIndex % 9,
  }

  const defaultBg =
    (cellCoords.col < 3 && cellCoords.row < 3) ||
    (cellCoords.col > 5 && cellCoords.row < 3) ||
    (cellCoords.col > 2 && cellCoords.col < 6 && cellCoords.row > 2 && cellCoords.row < 6) ||
    (cellCoords.col < 3 && cellCoords.row > 5) ||
    (cellCoords.col > 5 && cellCoords.row > 5)
      ? theme.colors.sudokuPalette.cellBackground
      : theme.colors.sudokuPalette.cellBackgroundAlt

  const val = puzzle[cellIndex]

  const isSelected = pointer?.index === cellIndex
  const isHighlighted =
    (pointer && pointer.row === cellCoords.row) || (pointer && pointer.col === cellCoords.col)
  const isHighlightedAlt = pointer && val !== "-" && val === puzzle[pointer.index]
  const isWrong = val !== "-" && solution && solution[cellIndex] !== val

  const cellBgColor = isWrong
    ? theme.colors.palette.pink
    : isSelected
      ? theme.colors.sudokuPalette.cellSelectedBg
      : isHighlighted
        ? theme.colors.sudokuPalette.cellHighlightedBg
        : isHighlightedAlt
          ? theme.colors.sudokuPalette.cellHighlightedBgAlt
          : defaultBg

  const handleSetValue = (value: string) => {
    if (!puzzle) return
    if (!value) return
    if (!pointer) return
    if (!solution) return
    if (originalPuzzle![pointer.index] !== "-") return

    if (isPaused) resume()

    const newPuzzle = puzzle
    newPuzzle[pointer.index] = value
    setPuzzle(newPuzzle)

    // Game over: Won
    if (newPuzzle.join("") === solution.join("")) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      pause()
      addEntry({
        date: new Date(),
        difficulty: difficulty!,
        puzzle: puzzle,
        originalPuzzle: originalPuzzle!,
        solution: solution,
        timer: timer,
        errorCount: errorCount,
        gameStatus: "won",
      })
      setGameStatus("won")
      return
    }

    // Game over: Lost
    if (newPuzzle[pointer.index] !== solution[pointer.index] && value !== "-") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      incrementErrorCount()
      // note: 4 because this makes it "on the fifth mistake"
      if (difficulty !== "easy" && errorCount >= 4) {
        pause()
        addEntry({
          date: new Date(),
          difficulty: difficulty!,
          puzzle: puzzle,
          originalPuzzle: originalPuzzle!,
          solution: solution,
          timer: timer,
          errorCount: 5, // note: force, kinda like index + 1 situation
          gameStatus: "lost",
        })
        setGameStatus("lost")
      }
      return
    }

    // Correct but not game over
    if (newPuzzle[pointer.index] === solution[pointer.index] && value !== "-") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }

  const handleInputChange = (newVal: string) => {
    const clearValues = ["", "-", "X", "x"]
    if (clearValues.includes(newVal)) {
      handleSetValue("-")
      return
    }
    if (Number.isNaN(Number(newVal))) {
      // Handle common mistranscriptions for 1 and 9
      if (newVal === "Q" || newVal === "q") {
        newVal = "9"
      } else if (newVal === "L" || newVal === "l") {
        newVal = "1"
      } else {
        // Don't allow non-numeric input other than the clear values
        return
      }
    }
    if (Number(newVal) < 1 || Number(newVal) > 9) return
    handleSetValue(newVal)
  }

  return (
    <TextField
      defaultValue={val === "-" ? "" : val.toString()}
      value={val === "-" ? "" : val.toString()}
      editable={originalPuzzle![cellIndex] === "-"}
      inputMode="none"
      contextMenuHidden={true}
      caretHidden={true}
      disableKeyboardShortcuts={true}
      showSoftInputOnFocus={false}
      keyboardType="numeric"
      maxLength={1}
      aria-label={`Row ${cellCoords.row + 1} Column ${cellCoords.col + 1}`}
      onPressIn={() => {
        setPointer(cellIndex)
      }}
      onChange={(e) => {
        handleInputChange(e.nativeEvent.text)
      }}
      containerStyle={themed({
        aspectRatio: 1,
        width: "11.111%",
        height: "11.111%",
        alignContent: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
      })}
      inputWrapperStyle={themed({
        height: "100%",
        width: "100%",
        padding: 0,
        margin: 0,
        borderRadius: 0,
        borderColor: theme.colors.border,
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: cellCoords.col % 3 === 0 ? 1 : 0.25,
        borderRightWidth: cellCoords.col % 3 === 2 ? 1 : 0.25,
        borderTopWidth: cellCoords.row % 3 === 0 ? 1 : 0.25,
        borderBottomWidth: cellCoords.row % 3 === 2 ? 1 : 0.25,
        backgroundColor: cellBgColor,
      })}
      style={themed({
        width: "100%",
        height: "100%",
        padding: 0,
        margin: 0,
        marginVertical: 0, // override system TextField margin
        marginHorizontal: 0, // override system TextField margin
        fontSize: platform.isPad && platform.isPortrait ? 52 : 32,
        fontFamily: "LexendDeca_200ExtraLight",
        textAlign: "center",
        fontWeight: 200,
      })}
    />
  )
}
