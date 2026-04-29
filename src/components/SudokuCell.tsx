// import { Keyboard } from "react-native"
import { Button } from "@/components/Button"
import { TextField } from "@/components/TextField"
import { useGameStore, useGameStoreHydration } from "@/storage/gameStore"
import { useSettingsStore } from "@/storage/settingsStore"
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
    clearPointer,
    incrementErrorCount,
    isPaused,
    timer,
    gameStatus,
    errorCount,
    resume,
    setGameStatus,
  } = useGameStore()
  const { applePencilSupportEnabled } = useSettingsStore()

  const cellCoords = {
    row: Math.floor(cellIndex / 9),
    col: cellIndex % 9,
  }

  const handleCellPress = () => {
    setPointer(cellIndex)
  }

  if (!hasHydrated || !puzzle) {
    return null
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
    if (originalPuzzle![pointer.index] !== "-") return
    if (!solution) return

    if (isPaused) resume()

    const newPuzzle = puzzle
    newPuzzle[pointer.index] = value
    setPuzzle(newPuzzle)

    if (newPuzzle.join("") === solution.join("")) {
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
    }

    if (newPuzzle[pointer.index] !== solution[pointer.index] && value !== "-") {
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
    }
  }

  const handleInputChange = (newVal: string) => {
    if (newVal === "") {
      handleSetValue("-")
      return
    }
    if (Number.isNaN(Number(newVal))) return
    if (Number(newVal) < 1 || Number(newVal) > 9) return
    handleSetValue(newVal)
  }

  if (platform.isPad && applePencilSupportEnabled) {
    return (
      <TextField
        defaultValue={val === "-" ? "" : val.toString()}
        value={val === "-" ? "" : val.toString()}
        keyboardType="number-pad"
        inputMode="numeric"
        contextMenuHidden={true}
        caretHidden={true}
        selectionColor={cellBgColor}
        selectionHandleColor={cellBgColor}
        editable={false}
        readOnly={originalPuzzle![cellIndex] !== "-"}
        disableKeyboardShortcuts={true}
        showSoftInputOnFocus={false}
        selectTextOnFocus={true}
        aria-label={`Row ${cellCoords.row + 1} Column ${cellCoords.col + 1}`}
        onPressIn={() => {
          handleCellPress()
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
        })}
        inputWrapperStyle={themed({
          height: "100%",
          width: "100%",
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
          fontSize: platform.isPad && platform.isPortrait ? 52 : 32,
          lineHeight: platform.isPad && platform.isPortrait ? 52 : 32,
          fontFamily: "LexendDeca_200ExtraLight",
          height: "100%",
          textAlign: "center",
          fontWeight: 200,
        })}
      />
    )
  }

  return (
    <Button
      preset="cell"
      onPress={() => handleCellPress()}
      style={themed({
        borderColor: theme.colors.border,
        borderStyle: "solid",
        borderLeftWidth: cellCoords.col % 3 === 0 ? 1 : 0.25,
        borderRightWidth: cellCoords.col % 3 === 2 ? 1 : 0.25,
        borderTopWidth: cellCoords.row % 3 === 0 ? 1 : 0.25,
        borderBottomWidth: cellCoords.row % 3 === 2 ? 1 : 0.25,
        backgroundColor: isWrong
          ? theme.colors.palette.pink
          : isSelected
            ? theme.colors.sudokuPalette.cellSelectedBg
            : isHighlighted
              ? theme.colors.sudokuPalette.cellHighlightedBg
              : isHighlightedAlt
                ? theme.colors.sudokuPalette.cellHighlightedBgAlt
                : defaultBg,
      })}
      textStyle={themed({
        fontSize: platform.isPad && platform.isPortrait ? 52 : 32,
        lineHeight: platform.isPad && platform.isPortrait ? 68 : 40,
        fontFamily: "LexendDeca_200ExtraLight",
        fontWeight: 200,
      })}
      text={val === "-" ? "" : val.toString()}
    />
  )
}
