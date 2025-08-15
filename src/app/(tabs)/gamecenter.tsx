import React, { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, Alert, RefreshControl } from "react-native"
import GameCenter from "expo-game-center"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { useHistoryStore } from "@/storage/historyStore"
import { useGameStore } from "@/storage/gameStore"
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"

// Game Center Leaderboard IDs (you'll need to configure these in App Store Connect)
const LEADERBOARD_IDS = {
  easy: "com.averyhere.justanothersudokuapp.leaderboard.easy",
  medium: "com.averyhere.justanothersudokuapp.leaderboard.medium",
  hard: "com.averyhere.justanothersudokuapp.leaderboard.hard",
  expert: "com.averyhere.justanothersudokuapp.leaderboard.expert",
}

// Achievement IDs (you'll need to configure these in App Store Connect)
const ACHIEVEMENT_IDS = {
  firstWin: "com.averyhere.justanothersudokuapp.achievement.firstwin",
  perfectGame: "com.averyhere.justanothersudokuapp.achievement.perfectgame",
  speedster: "com.averyhere.justanothersudokuapp.achievement.speedster",
  persistent: "com.averyhere.justanothersudokuapp.achievement.persistent",
}

interface GameCenterState {
  isAuthenticated: boolean
  isAvailable: boolean
  playerAlias?: string
  playerID?: string
}

export default function GameCenterTab() {
  const [gameCenterState, setGameCenterState] = useState<GameCenterState>({
    isAuthenticated: false,
    isAvailable: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])

  const { entries } = useHistoryStore()
  const { gameStatus, timer, difficulty, errorCount } = useGameStore()

  useEffect(() => {
    initializeGameCenter()
  }, [])

  useEffect(() => {
    // Submit score when game is won
    if (gameStatus === "won" && timer > 0 && difficulty) {
      submitScore(difficulty, timer, errorCount)
    }
  }, [gameStatus, timer, difficulty, errorCount])

  const initializeGameCenter = async () => {
    try {
      setIsLoading(true)

      // Check if Game Center is available
      const isAvailable = await GameCenter.isGameCenterAvailable()

      if (!isAvailable) {
        setGameCenterState((prev) => ({ ...prev, isAvailable: false }))
        return
      }

      // Authenticate player
      const isAuthenticated = await GameCenter.authenticateLocalPlayer()

      if (isAuthenticated) {
        const player = await GameCenter.getLocalPlayer()
        if (player) {
          setGameCenterState({
            isAuthenticated: true,
            isAvailable: true,
            playerAlias: player.alias,
            playerID: player.playerID,
          })

          // Load leaderboard data (we'll implement this differently since there's no direct API)
          // await loadLeaderboardData()
        }
      } else {
        setGameCenterState((prev) => ({
          ...prev,
          isAvailable: true,
          isAuthenticated: false,
        }))
      }
    } catch (error) {
      console.error("Game Center initialization error:", error)
      Alert.alert("Game Center Error", "Failed to initialize Game Center")
    } finally {
      setIsLoading(false)
    }
  }

  const submitScore = async (difficulty: Difficulty, time: number, errors: number) => {
    if (!gameCenterState.isAuthenticated) return

    try {
      const leaderboardID = LEADERBOARD_IDS[difficulty]
      if (!leaderboardID) return

      // Calculate score (lower time is better, penalties for errors)
      const score = Math.max(1, 10000 - time - errors * 300)

      const success = await GameCenter.submitScore(score, leaderboardID)

      if (success) {
        // Check and submit achievements
        await checkAndSubmitAchievements(difficulty, time, errors)
        console.log(`Score submitted: ${score} for ${difficulty}`)
      }
    } catch (error) {
      console.error("Error submitting score:", error)
    }
  }

  const checkAndSubmitAchievements = async (
    difficulty: Difficulty,
    time: number,
    errors: number,
  ) => {
    try {
      const wonGames = entries.filter((entry) => entry.gameStatus === "won")

      // First Win Achievement
      if (wonGames.length === 1) {
        await GameCenter.reportAchievement(ACHIEVEMENT_IDS.firstWin, 100)
      }

      // Perfect Game Achievement (no errors)
      if (errors === 0) {
        await GameCenter.reportAchievement(ACHIEVEMENT_IDS.perfectGame, 100)
      }

      // Speedster Achievement (complete easy game in under 5 minutes)
      if (difficulty === "easy" && time < 300) {
        await GameCenter.reportAchievement(ACHIEVEMENT_IDS.speedster, 100)
      }

      // Persistent Achievement (10 games completed)
      if (wonGames.length >= 10) {
        await GameCenter.reportAchievement(ACHIEVEMENT_IDS.persistent, 100)
      }
    } catch (error) {
      console.error("Error submitting achievements:", error)
    }
  }

  const loadLeaderboardData = async () => {
    // Note: The current expo-game-center API doesn't provide a method to load scores programmatically
    // The leaderboard data will be shown through the native Game Center UI
    console.log("Leaderboard data loading not available in current API")
  }

  const showLeaderboard = async (difficulty?: Difficulty) => {
    if (!gameCenterState.isAuthenticated) {
      Alert.alert("Not Authenticated", "Please authenticate with Game Center first")
      return
    }

    try {
      if (difficulty) {
        const leaderboardID = LEADERBOARD_IDS[difficulty]
        await GameCenter.presentLeaderboard(leaderboardID)
      } else {
        await GameCenter.presentGameCenterViewController()
      }
    } catch (error) {
      console.error("Error showing leaderboard:", error)
      Alert.alert("Error", "Failed to show leaderboard")
    }
  }

  const showAchievements = async () => {
    if (!gameCenterState.isAuthenticated) {
      Alert.alert("Not Authenticated", "Please authenticate with Game Center first")
      return
    }

    try {
      await GameCenter.presentAchievements()
    } catch (error) {
      console.error("Error showing achievements:", error)
      Alert.alert("Error", "Failed to show achievements")
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await initializeGameCenter()
    setRefreshing(false)
  }

  const getPlayerStats = () => {
    const wonGames = entries.filter((entry) => entry.gameStatus === "won")
    const totalGames = entries.length
    const averageTime =
      wonGames.length > 0
        ? Math.round(wonGames.reduce((sum, game) => sum + game.timer, 0) / wonGames.length)
        : 0
    const bestTime = wonGames.length > 0 ? Math.min(...wonGames.map((game) => game.timer)) : 0

    return {
      totalGames,
      wonGames: wonGames.length,
      winRate: totalGames > 0 ? Math.round((wonGames.length / totalGames) * 100) : 0,
      averageTime,
      bestTime,
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text size="lg" text="Loading Game Center..." />
      </View>
    )
  }

  if (!gameCenterState.isAvailable) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text size="lg" text="Game Center Unavailable" style={styles.title} />
          <Text text="Game Center is not available on this device or iOS version." />
          <Button text="Retry" onPress={initializeGameCenter} style={styles.button} />
        </Card>
      </View>
    )
  }

  if (!gameCenterState.isAuthenticated) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text size="lg" text="Game Center Authentication" style={styles.title} />
          <Text text="Please sign in to Game Center to access leaderboards and achievements." />
          <Button
            text="Sign In to Game Center"
            onPress={initializeGameCenter}
            style={styles.button}
          />
        </Card>
      </View>
    )
  }

  const stats = getPlayerStats()

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.container}>
        {/* Player Info */}
        <Card style={styles.card}>
          <Text size="lg" text="Game Center" style={styles.title} />
          <Text text={`Welcome, ${gameCenterState.playerAlias}!`} style={styles.subtitle} />
        </Card>

        {/* Player Stats */}
        <Card style={styles.card}>
          <Text size="md" text="Your Stats" style={styles.sectionTitle} />
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text size="lg" text={stats.totalGames.toString()} style={styles.statValue} />
              <Text text="Total Games" style={styles.statLabel} />
            </View>
            <View style={styles.statItem}>
              <Text size="lg" text={stats.wonGames.toString()} style={styles.statValue} />
              <Text text="Games Won" style={styles.statLabel} />
            </View>
            <View style={styles.statItem}>
              <Text size="lg" text={`${stats.winRate}%`} style={styles.statValue} />
              <Text text="Win Rate" style={styles.statLabel} />
            </View>
            <View style={styles.statItem}>
              <Text size="lg" text={formatTime(stats.bestTime)} style={styles.statValue} />
              <Text text="Best Time" style={styles.statLabel} />
            </View>
          </View>
        </Card>

        {/* Leaderboards */}
        <Card style={styles.card}>
          <Text size="md" text="Leaderboards" style={styles.sectionTitle} />
          <View style={styles.buttonGrid}>
            <Button text="Easy" onPress={() => showLeaderboard("easy")} style={styles.gridButton} />
            <Button
              text="Medium"
              onPress={() => showLeaderboard("medium")}
              style={styles.gridButton}
            />
            <Button text="Hard" onPress={() => showLeaderboard("hard")} style={styles.gridButton} />
            <Button
              text="Expert"
              onPress={() => showLeaderboard("expert")}
              style={styles.gridButton}
            />
          </View>
          <Button
            text="View All Leaderboards"
            onPress={() => showLeaderboard()}
            style={styles.button}
          />
        </Card>

        {/* Achievements */}
        <Card style={styles.card}>
          <Text size="md" text="Achievements" style={styles.sectionTitle} />
          <Text text="Track your progress and unlock achievements!" />
          <Button text="View Achievements" onPress={showAchievements} style={styles.button} />
        </Card>

        {/* Quick Leaderboard Preview */}
        {leaderboardData.length > 0 && (
          <Card style={styles.card}>
            <Text size="md" text="Top Scores Preview" style={styles.sectionTitle} />
            {leaderboardData.slice(0, 2).map((leaderboard, index) => (
              <View key={index} style={styles.leaderboardPreview}>
                <Text
                  text={`${leaderboard.difficulty.toUpperCase()}`}
                  style={styles.difficultyLabel}
                />
                {leaderboard.scores.slice(0, 3).map((score: any, scoreIndex: number) => (
                  <View key={scoreIndex} style={styles.scoreItem}>
                    <Text text={`${scoreIndex + 1}. ${score.player?.alias || "Anonymous"}`} />
                    <Text text={score.score.toString()} style={styles.scoreValue} />
                  </View>
                ))}
              </View>
            ))}
          </Card>
        )}
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
