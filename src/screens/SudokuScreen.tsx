import { View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { ThemedStyle } from "@/theme/types"
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
import { Button } from "@/components/Button"
import { useState } from "react"

export function SudokuScreen() {
  const { themed, theme, platform } = useAppTheme()
  const hasHydrated = useGameStoreHydration()
  const { puzzle } = useGameStore()
  const [controlsLeft, setControlsLeft] = useState<boolean>(false)

  if (!hasHydrated) {
    return <Text text="Loading game..." />
  }

  const $gameboardLayout =
    platform.isPad && platform.isPortrait
      ? $padPortraitLayout
      : platform.isPad && platform.isLandscape && controlsLeft
        ? $padLandscapeLayoutLeft
        : platform.isPad && platform.isLandscape && !controlsLeft
          ? $padLandscapeLayout
          : $defaultLayout

  return (
    <Screen contentContainerStyle={themed($styles.flex1)}>
      <SafeAreaView
        style={themed({
          height: "100%",
        })}
      >
        <View
          style={themed({
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: theme.spacing.md,
          })}
        >
          <Logo size={96} variant="color" />
          <View style={themed({ flexDirection: "column", alignItems: "flex-start" })}>
            <Text
              style={themed({
                fontSize: 23,
                lineHeight: 23,
                textTransform: "uppercase",
                color: theme.colors.tintInactive,
                textAlign: "center",
              })}
            >
              Just Another
            </Text>
            <Text
              style={themed({
                fontSize: 42,
                lineHeight: 42,
                textTransform: "uppercase",
                color: theme.colors.tintInactive,
                textAlign: "center",
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
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              gap: 64,
            })}
          >
            <View style={themed($gameboardLayout)}>
              <View
                style={themed({
                  width: platform.isPad && platform.isLandscape ? 480 : "100%",
                  maxWidth: platform.isPad && platform.isLandscape ? "50%" : "100%",
                })}
              >
                <SudokuHeader />
                <SudokuBoard />
              </View>
              <View
                style={themed({
                  width: platform.isPad && platform.isLandscape ? 480 : "100%",
                  maxWidth: platform.isPad && platform.isLandscape ? "50%" : "100%",
                })}
              >
                <SudokuControls />
              </View>
            </View>
            {platform.isPad && platform.isLandscape && (
              <View>
                <Button
                  preset="default"
                  text={`Move Controls ${controlsLeft ? "Right" : "Left"}`}
                  onPress={() => setControlsLeft(!controlsLeft)}
                />
              </View>
            )}
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

const $defaultLayout: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  gap: spacing.sm,
  paddingHorizontal: spacing.sm,
})

const $padPortraitLayout: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  maxWidth: 768,
})

const $padLandscapeLayout: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
})

const $padLandscapeLayoutLeft: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row-reverse",
})
