import { View, StyleSheet } from "react-native"
import { Text } from "@/components/Text"
import { useGameCenter } from "expo-game-center"

import config from "@/config"

export default function Tab() {
  const { status } = useGameCenter({
    leaderboards: {
      bestScore: config.gameCenterLeaderboardId,
    },
  })

  console.log("Game Center status:", status)
  return (
    <View style={styles.container}>
      <Text size="lg" text="Game Center Here" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
