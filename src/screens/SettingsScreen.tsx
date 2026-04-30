import { View, ViewStyle, ScrollView } from "react-native"
import { Link } from "expo-router"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "@/components/Button"
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
  const { clearHistory } = useHistoryStore()

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
                flexDirection: "column",
                gap: platform.isPad ? 64 : 32,
                justifyContent: "center",
              })}
            >
              <View>
                <Text size="lg" tx="settingsScreen:labels.defaultDifficulty" />
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
                      width: "25%",
                      borderLeftWidth: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    })}
                    tx="common:expertLabel"
                  />
                </View>
              </View>

              <View>
                <Text size="lg" tx="settingsScreen:labels.theme" />
                <ThemeToggle />
              </View>

              <View>
                <View style={themed({ gap: 16, padding: 12 })}>
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
              </View>
            </View>

            <View
              style={themed({
                gap: 16,
                padding: 8,
                width: "100%",
              })}
            >
              <Text style={themed({ textAlign: "center" })}>🏳️‍🌈🏳️‍⚧️✌🏼❤️</Text>
              <Text
                size="xs"
                style={themed({ textAlign: "center" })}
                tx="settingsScreen:madeWithLove"
              />
              <View
                style={themed({
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 4,
                })}
              >
                <Link
                  href="https://github.com/averyhere/just-another-sudoku-app"
                  style={themed({ padding: 8 })}
                >
                  <FontAwesome name="github" size={24} color={theme.colors.tint} />
                </Link>
                <Link href="https://averyhere.com" style={themed({ padding: 8 })}>
                  <FontAwesome name="link" size={24} color={theme.colors.tint} />
                </Link>
                <Link href="https://www.linkedin.com/in/averyondo" style={themed({ padding: 8 })}>
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
  width: "100%",
  height: "100%",
  gap: 32,
  flexDirection: "column",
  justifyContent: "space-between",
  padding: spacing.lg,
})
