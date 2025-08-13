// In your React component
import { useState } from "react"
import { ViewStyle, TextStyle } from "react-native"
import { View } from "react-native"
import { useRouter } from "expo-router"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { SafeAreaView } from "react-native-safe-area-context"
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useGameStore } from "@/storage/gameStore"
import { useSettingsStore } from "@/storage/settingsStore"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { ThemedStyle } from "@/theme/types"

export function EndGameScreen() {
  const { themed, theme } = useAppTheme()
  const { defaultDifficulty } = useSettingsStore()
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(defaultDifficulty)

  const router = useRouter()

  const { newGame, gameStatus, difficulty, errorCount } = useGameStore()

  const handleNewGame = () => {
    newGame(selectedDifficulty)
    router.push("/gameboard")
  }

  return (
    <Screen contentContainerStyle={$styles.flex1}>
      <SafeAreaView
        style={themed({
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 64,
        })}
      >
        <Text size="xl" style={themed({ textAlign: "center" })}>
          {gameStatus === "won" ? "Congratulations!" : "Better luck next time!"}
        </Text>
        <View
          style={themed({
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          })}
        >
          <Card
            ContentComponent={
              <View style={themed($historyRow)}>
                {gameStatus === "won" ? (
                  <View style={themed($historyCol)}>
                    <FontAwesome name="trophy" size={48} color="green" />
                    <Text size="xs" style={themed($historyStatLabel)} text="Won" />
                  </View>
                ) : (
                  <View style={themed($historyCol)}>
                    <FontAwesome name="frown-o" size={48} color="red" />
                    <Text size="xs" style={themed($historyStatLabel)} text="Lost" />
                  </View>
                )}
                <View style={themed($historyCol)}>
                  <View style={themed($historyStatValueWrapper)}>
                    <Text
                      size="xl"
                      adjustsFontSizeToFit
                      style={themed($historyStatValue)}
                      text={difficulty}
                    />
                  </View>
                  <Text size="xs" style={themed($historyStatLabel)} text="Difficulty" />
                </View>
                <View style={themed($historyCol)}>
                  <View style={themed($historyStatValueWrapper)}>
                    <Text
                      size="xl"
                      adjustsFontSizeToFit
                      style={themed($historyStatValue)}
                      text="test"
                    />
                  </View>
                  <Text size="xs" style={themed($historyStatLabel)} text="Time" />
                </View>
                <View style={themed($historyCol)}>
                  <View style={themed($historyStatValueWrapper)}>
                    <Text
                      size="xl"
                      adjustsFontSizeToFit
                      style={themed($historyStatValue)}
                      text={errorCount.toString()}
                    />
                  </View>
                  <Text size="xs" style={themed($historyStatLabel)} text="Errors" />
                </View>
              </View>
            }
          />
        </View>

        <View style={themed({ gap: 8 })}>
          <Text size="lg" style={themed({ textAlign: "center" })} text="Play again?" />

          <View
            style={themed({
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
            })}
          >
            <Button
              onPress={() => setSelectedDifficulty("easy")}
              style={themed({
                backgroundColor: selectedDifficulty === "easy" ? theme.colors.palette.pink : "",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              })}
              tx="common:easyLabel"
            />
            <Button
              onPress={() => setSelectedDifficulty("medium")}
              style={themed({
                backgroundColor: selectedDifficulty === "medium" ? theme.colors.palette.pink : "",
                borderLeftWidth: 0,
                borderRadius: 0,
              })}
              tx="common:mediumLabel"
            />
            <Button
              onPress={() => setSelectedDifficulty("hard")}
              style={themed({
                backgroundColor: selectedDifficulty === "hard" ? theme.colors.palette.pink : "",
                borderLeftWidth: 0,
                borderRadius: 0,
              })}
              tx="common:hardLabel"
            />
            <Button
              onPress={() => setSelectedDifficulty("expert")}
              style={themed({
                backgroundColor: selectedDifficulty === "expert" ? theme.colors.palette.pink : "",
                borderLeftWidth: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              })}
              tx="common:expertLabel"
            />
          </View>

          <View
            style={themed({
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
            })}
          >
            <Button
              preset="filled"
              style={themed({
                backgroundColor: theme.colors.palette.pink,
              })}
              onPress={handleNewGame}
            >
              <Text tx="common:startButtonText" />
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Screen>
  )
}

const $historyRow: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-around",
})
const $historyCol: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "column",
  alignItems: "center",
})
const $historyStatLabel: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  color: colors.textDim,
  textTransform: "uppercase",
  fontFamily: typography.fonts.lexendDeca.light,
})
const $historyStatValueWrapper: ThemedStyle<ViewStyle> = () => ({
  height: 48,
  justifyContent: "center",
})
const $historyStatValue: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  color: colors.text,
  fontFamily: typography.fonts.lexendDeca.regular,
  textTransform: "capitalize",
})
