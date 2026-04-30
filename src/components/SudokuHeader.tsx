import { View } from "react-native"
import { useTranslation } from "react-i18next"
import { GameTimer } from "@/components/GameTimer"
import { Text } from "@/components/Text"
import { useGameStore, useGameStoreHydration } from "@/storage/gameStore"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

export function SudokuHeader() {
  const { themed } = useAppTheme()
  const hasHydrated = useGameStoreHydration()
  const { difficulty, errorCount } = useGameStore()
  const { t } = useTranslation()

  if (!hasHydrated) {
    return <Text tx="common:loading" />
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
      <Text text={t(`common:${difficulty}Label`)} />
      <GameTimer />
      <Text text={difficulty !== "easy" ? `${errorCount} / 5` : errorCount.toString()} />
    </View>
  )
}
