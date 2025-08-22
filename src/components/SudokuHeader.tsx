import { View } from "react-native"

import { GameTimer } from "@/components/GameTimer"
import { Text } from "@/components/Text"
import { useGameStore, useGameStoreHydration } from "@/storage/gameStore"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

export function SudokuHeader() {
  const { themed } = useAppTheme()
  const hasHydrated = useGameStoreHydration()
  const { difficulty, errorCount } = useGameStore()

  if (!hasHydrated) {
    return <Text text="Loading game..." />
  }

  return (
    <View
      style={themed({
        ...$styles.row,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      })}
    >
      <Text style={themed({ textTransform: "capitalize" })} text={difficulty} />
      <GameTimer />
      <Text text={difficulty !== "easy" ? `${errorCount} / 5` : errorCount.toString()} />
    </View>
  )
}
