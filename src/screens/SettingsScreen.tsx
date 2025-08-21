// In your React component
import { View, ViewStyle, ScrollView } from "react-native"
import { Link } from "expo-router"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { SafeAreaView } from "react-native-safe-area-context"
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type"

import { Button } from "@/components/Button"
import { Card } from "@/components/Card"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useHistoryStore } from "@/storage/historyStore"
import { useSettingsStore } from "@/storage/settingsStore"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { ThemedStyle } from "@/theme/types"

export function SettingsScreen() {
  const { themed, theme, platform } = useAppTheme()

  const { defaultDifficulty, setDefaultDifficulty } = useSettingsStore()
  const { clearHistory, seed } = useHistoryStore()

  const handleUpdateDefaultDifficulty = (difficulty: Difficulty) => {
    setDefaultDifficulty(difficulty)
  }

  return (
    <Screen contentContainerStyle={$styles.flex1}>
      <ScrollView>
        <SafeAreaView
          style={themed({
            width: "100%",
            height: "100%",
            gap: 8,
            paddingBottom: 64,
          })}
        >
          <View style={themed($topContainer)}>
            <View style={$styles.row}>
              <Text size="xxl" tx="settingsScreen:title" />
            </View>
          </View>

          <View style={themed($bottomContainer)}>
            <View
              style={themed({
                flexDirection: platform.isPad ? "row" : "column",
                gap: 32,
                justifyContent: "center",
              })}
            >
              <Card
                heading="Set a default difficulty level"
                style={themed({
                  width: platform.isPad ? "40%" : "100%",
                })}
                ContentComponent={
                  <View
                    style={themed({
                      flexDirection: "row",
                      alignContent: "center",
                      justifyContent: "center",
                      width: "100%",
                    })}
                  >
                    <Button
                      preset={defaultDifficulty === "easy" ? "filled" : "default"}
                      onPress={() => setDefaultDifficulty("easy")}
                      style={themed({
                        width: "25%",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      })}
                      tx="common:easyLabel"
                    />
                    <Button
                      preset={defaultDifficulty === "medium" ? "filled" : "default"}
                      onPress={() => setDefaultDifficulty("medium")}
                      style={themed({
                        width: "25%",
                        borderLeftWidth: 0,
                        borderRadius: 0,
                      })}
                      tx="common:mediumLabel"
                    />
                    <Button
                      preset={defaultDifficulty === "hard" ? "filled" : "default"}
                      onPress={() => setDefaultDifficulty("hard")}
                      style={themed({
                        width: "25%",
                        borderLeftWidth: 0,
                        borderRadius: 0,
                      })}
                      tx="common:hardLabel"
                    />
                    <Button
                      preset={defaultDifficulty === "expert" ? "filled" : "default"}
                      onPress={() => setDefaultDifficulty("expert")}
                      style={themed({
                        width: "25 %",
                        borderLeftWidth: 0,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      })}
                      tx="common:expertLabel"
                    />
                  </View>
                }
              />

              <Card
                heading="Select a color theme"
                style={themed({
                  width: platform.isPad ? "40%" : "100%",
                })}
                ContentComponent={
                  <View
                    style={themed({
                      gap: 16,
                      padding: 8,
                      alignItems: "center",
                    })}
                  >
                    <ThemeToggle />
                  </View>
                }
              />
            </View>
            <View
              style={themed({
                flexDirection: platform.isPad ? "row" : "column",
                gap: 32,
                justifyContent: "center",
              })}
            >
              <Card
                heading="Manage my data"
                style={themed({
                  width: platform.isPad ? "40%" : "100%",
                })}
                ContentComponent={
                  <View style={themed({ gap: 16, padding: 8 })}>
                    <View
                      style={themed({
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      })}
                    >
                      <Text size="lg" tx="settingsScreen:labels.clearHistory" />
                      <Button preset="cell" onPress={clearHistory}>
                        <FontAwesome name="history" size={24} color={theme.colors.tint} />
                      </Button>
                    </View>
                  </View>
                }
              />

              <Card
                heading="From the developer"
                style={themed({
                  width: platform.isPad ? "40%" : "100%",
                })}
                ContentComponent={
                  <View style={themed({ gap: 16, padding: 8 })}>
                    <Text style={themed({ textAlign: "center" })}>🏳️‍🌈🏳️‍⚧️✌🏼❤️</Text>
                    <Text style={themed({ textAlign: "center" })}>
                      This app was developed with ❤️ by Avery Ondo.
                    </Text>
                    <View
                      style={themed({
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 8,
                      })}
                    >
                      <Link
                        href="https://github.com/averyhere/just-another-sudoku-app"
                        aria-label="View this project's code in its GitHub Repository"
                        style={themed({ padding: 8 })}
                      >
                        <FontAwesome name="github" size={24} color={theme.colors.tint} />
                      </Link>
                      <Link
                        href="https://averyhere.com"
                        aria-label="Open Avery's website in your browser"
                        style={themed({ padding: 8 })}
                      >
                        <FontAwesome name="link" size={24} color={theme.colors.tint} />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/averyondo"
                        aria-label="Open Avery's LinkedIn Profile in your browser"
                        style={themed({ padding: 8 })}
                      >
                        <FontAwesome name="linkedin" size={24} color={theme.colors.tint} />
                      </Link>
                    </View>
                    <Text style={themed({ textAlign: "center" })} size="xxs">
                      &copy; {new Date().getFullYear()} Avery Ondo.
                    </Text>
                  </View>
                }
              />
            </View>

            {process.env.NODE_ENV === "development" && (
              <View
                style={themed({
                  flexDirection: platform.isPad ? "row" : "column",
                  gap: 32,
                  justifyContent: "center",
                })}
              >
                <Card
                  heading="Development Tools"
                  style={themed({
                    width: platform.isPad ? "40%" : "100%",
                  })}
                  headingStyle={{ color: theme.colors.error }}
                  ContentComponent={
                    <View
                      style={themed({
                        gap: 16,
                        padding: 8,
                      })}
                    >
                      <View
                        style={themed({
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        })}
                      >
                        <Text size="lg" text="Seed History" />
                        <Button preset="cell" onPress={seed}>
                          <FontAwesome name="database" size={24} color={theme.colors.text} />
                        </Button>
                      </View>
                    </View>
                  }
                />
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 0.5,
  padding: spacing.sm,
  alignItems: "center",
  justifyContent: "center",
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  gap: 32,
  flexWrap: "wrap",
  padding: spacing.sm,
})
