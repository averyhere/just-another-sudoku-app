// In your React component
import { Button } from "@/components/Button"
import { useGameStore, useGameStoreHydration } from "@/storage/gameStore"
import { useAppTheme } from "@/theme/context"

export function SudokuCell({ cellIndex }: { cellIndex: number }) {
  const hasHydrated = useGameStoreHydration()
  const { themed, theme } = useAppTheme()
  const { pointer, setPointer, puzzle, solution } = useGameStore()

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
        fontSize: 32,
        fontFamily: "LexendDeca_200ExtraLight",
        fontWeight: 200,
      })}
      text={val === "-" ? "" : val.toString()}
    />
  )
}
