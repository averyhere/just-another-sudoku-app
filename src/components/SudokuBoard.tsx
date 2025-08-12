import { View } from "react-native"

import { SudokuCell } from "@/components/SudokuCell"
import { Text } from "@/components/Text"
import { useGameStore, useGameStoreHydration } from "@/storage/gameStore"
import { useAppTheme } from "@/theme/context"

export function SudokuBoard() {
  const { themed, theme } = useAppTheme()
  const hasHydrated = useGameStoreHydration()
  const { puzzle } = useGameStore()

  if (!hasHydrated) {
    return <Text text="Loading game..." />
  }

  if (!puzzle) {
    return <Text text="No puzzle found" />
  }

  return (
    <View
      style={themed({
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: theme.colors.sudokuPalette.cellBackground,
        aspectRatio: 1,
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderStyle: "solid",
      })}
    >
      {puzzle.map((cell, cellIndex) => (
        <SudokuCell key={`cell-${cellIndex}`} cellIndex={cellIndex} />
      ))}
    </View>
  )
}
