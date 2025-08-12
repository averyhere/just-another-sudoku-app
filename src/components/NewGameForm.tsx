// In your React component
import { useState } from "react"
import { View } from "react-native"
import { useRouter } from "expo-router"
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"

import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { useGameStore } from "@/storage/gameStore"
import { useSettingsStore } from "@/storage/settingsStore"
import { useAppTheme } from "@/theme/context"

export function NewGameForm({ onStartNewGame }: { onStartNewGame?: () => void }) {
  const { themed } = useAppTheme()
  const { defaultDifficulty } = useSettingsStore()
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(defaultDifficulty)

  const router = useRouter()

  const { newGame, gameStatus } = useGameStore()

  const handleNewGame = () => {
    if (onStartNewGame) {
      onStartNewGame()
    }
    newGame(selectedDifficulty)
    router.push("/gameboard")
  }

  return (
    <View style={themed({ gap: 16 })}>
      <Text size="xs" style={themed({ textAlign: "center" })} tx="newGameScreen:description" />

      <View
        style={themed({
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
        })}
      >
        <Button
          preset={selectedDifficulty === "easy" ? "filled" : "default"}
          onPress={() => setSelectedDifficulty("easy")}
          style={themed({
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          })}
          tx="common:easyLabel"
        />
        <Button
          preset={selectedDifficulty === "medium" ? "filled" : "default"}
          onPress={() => setSelectedDifficulty("medium")}
          style={themed({
            borderLeftWidth: 0,
            borderRadius: 0,
          })}
          tx="common:mediumLabel"
        />
        <Button
          preset={selectedDifficulty === "hard" ? "filled" : "default"}
          onPress={() => setSelectedDifficulty("hard")}
          style={themed({
            borderLeftWidth: 0,
            borderRadius: 0,
          })}
          tx="common:hardLabel"
        />
        <Button
          preset={selectedDifficulty === "expert" ? "filled" : "default"}
          onPress={() => setSelectedDifficulty("expert")}
          style={themed({
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
          preset="3d"
          onPress={handleNewGame}
          text={gameStatus === "playing" ? "New Game" : "Start Game"}
        />
      </View>
    </View>
  )
}
