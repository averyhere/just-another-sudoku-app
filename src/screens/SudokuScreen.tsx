import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { GameOverModal } from "@/components/GameOverModal"
import { Logo } from "@/components/Logo"
import { NewGameForm } from "@/components/NewGameForm"
import { Screen } from "@/components/Screen"
import { SudokuBoard } from "@/components/SudokuBoard"
import { SudokuControls } from "@/components/SudokuControls"
import { SudokuHeader } from "@/components/SudokuHeader"
import { Text } from "@/components/Text"
import { useGameStore, useGameStoreHydration } from "@/storage/gameStore"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

export function SudokuScreen() {
  const { themed, theme } = useAppTheme()
  const hasHydrated = useGameStoreHydration()
  const { puzzle } = useGameStore()

  if (!hasHydrated) {
    return <Text text="Loading game..." />
  }

  return (
    <Screen contentContainerStyle={$styles.flex1}>
      <SafeAreaView
        style={themed({
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: theme.spacing.md,
        })}
      >
        <View
          style={themed({
            flexDirection: "row",
            alignItems: "center",
            marginBlockEnd: theme.spacing.xxxl,
          })}
        >
          <Logo size={48} variant="color" />
          <View style={themed({ flexDirection: "column", alignItems: "flex-start" })}>
            <Text
              style={themed({
                fontSize: 12,
                lineHeight: 12,
                textTransform: "uppercase",
                color: theme.colors.textDim,
              })}
            >
              Just Another
            </Text>
            <Text
              style={themed({
                fontSize: 21,
                lineHeight: 21,
                textTransform: "uppercase",
                color: theme.colors.textDim,
              })}
            >
              Sudoku
            </Text>
          </View>
        </View>

        {puzzle && (
          <View
            style={themed({
              width: "100%",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
            })}
          >
            <SudokuHeader />
            <SudokuBoard />
            <SudokuControls />
          </View>
        )}
        {!puzzle && (
          <View
            style={themed({
              width: "100%",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
            })}
          >
            <NewGameForm />
          </View>
        )}
        <GameOverModal />
      </SafeAreaView>
    </Screen>
  )
}
