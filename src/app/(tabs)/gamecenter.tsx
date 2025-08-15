import React, { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, Alert, RefreshControl } from "react-native"
import { useGameCenter } from "expo-game-center"

import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { useHistoryStore } from "@/storage/historyStore"
import { useGameStore } from "@/storage/gameStore"
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"

// Game Center Leaderboard IDs (you'll need to configure these in App Store Connect)
const LEADERBOARD_IDS = {
  easy: "JustAnotherSudokuLeaderboardBestScore.difficulty.easy",
  medium: "JustAnotherSudokuLeaderboardBestScore.difficulty.medium",
  hard: "JustAnotherSudokuLeaderboardBestScore.difficulty.hard",
  expert: "JustAnotherSudokuLeaderboardBestScore.difficulty.expert",
}

export default function GameCenterTab() {
  const { isLoading, isReady, showLeaderboard, player } = useGameCenter({
    leaderboards: {
      best_score: "JustAnotherSudokuLeaderboardBestScore",
    },
    enableLogging: true,
    autoInitialize: true,
    autoAuthenticate: true,
  })

  if (isLoading) {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Text size="lg" text="Loading Game Center..." style={styles.title} />
          </Card>
        </View>
      </ScrollView>
    )
  }

  if (!isReady) {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Text size="lg" text="Game Center is not available" style={styles.title} />
          </Card>
        </View>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text size="lg" text={`Hey ${player?.displayName || "there"}!`} style={styles.title} />
          <Button
            text="Show Leaderboard"
            onPress={() => {
              showLeaderboard("best_score")
            }}
          />
        </Card>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: "600",
  },
  button: {
    marginTop: 12,
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  gridButton: {
    width: "48%",
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
  },
  statValue: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  leaderboardPreview: {
    marginBottom: 16,
  },
  difficultyLabel: {
    fontWeight: "600",
    marginBottom: 8,
  },
  scoreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  scoreValue: {
    fontWeight: "500",
  },
})
