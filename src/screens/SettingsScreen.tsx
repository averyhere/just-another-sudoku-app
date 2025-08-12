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
  const { themed, theme } = useAppTheme()

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
            <Card
              heading="Set a default difficulty level"
              ContentComponent={
                <View
                  style={themed({
                    padding: 8,
                    flexDirection: "row",
                    width: "100%",
                  })}
                >
                  <Button
                    preset={defaultDifficulty === "easy" ? "filled" : "default"}
                    style={themed({
                      flex: 1,
                      padding: 0,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    })}
                    textStyle={themed({
                      padding: 0,
                    })}
                    onPress={() => handleUpdateDefaultDifficulty("easy")}
                    tx="common:easyLabel"
                  />
                  <Button
                    preset={defaultDifficulty === "medium" ? "filled" : "default"}
                    style={themed({
                      flex: 1,
                      padding: 0,
                      margin: 0,
                      borderLeftWidth: 0,
                      borderRadius: 0,
                    })}
                    textStyle={themed({
                      padding: 0,
                      margin: 0,
                    })}
                    onPress={() => handleUpdateDefaultDifficulty("medium")}
                    tx="common:mediumLabel"
                  />
                  <Button
                    preset={defaultDifficulty === "hard" ? "filled" : "default"}
                    style={themed({
                      flex: 1,
                      padding: 0,
                      borderLeftWidth: 0,
                      borderRadius: 0,
                    })}
                    textStyle={themed({
                      padding: 0,
                    })}
                    onPress={() => handleUpdateDefaultDifficulty("hard")}
                    tx="common:hardLabel"
                  />
                  <Button
                    preset={defaultDifficulty === "expert" ? "filled" : "default"}
                    style={themed({
                      flex: 1,
                      padding: 0,
                      borderLeftWidth: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    })}
                    textStyle={themed({
                      padding: 0,
                    })}
                    onPress={() => handleUpdateDefaultDifficulty("expert")}
                    tx="common:expertLabel"
                  />
                </View>
              }
            />

            <Card
              heading="Select a color theme"
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

            <Card
              heading="Manage my data"
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

            {process.env.NODE_ENV === "development" && (
              <Card
                heading="Development Tools"
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
            )}

            <View
              style={themed({
                alignItems: "center",
                alignContent: "center",
                gap: 8,
              })}
            >
              <Text style={themed({ textAlign: "center" })} size="sm">
                🏳️‍🌈🏳️‍⚧️✌🏼❤️
              </Text>
              <Text style={themed({ textAlign: "center" })} size="sm">
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
                  href="https://github.com/averyondo/just-another-sudoku-app"
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
  flex: 1,
  gap: 32,
  padding: spacing.sm,
})
