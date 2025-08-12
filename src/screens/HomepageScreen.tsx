// In your React component
import { View, ViewStyle, ScrollView, TextStyle } from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { SafeAreaView } from "react-native-safe-area-context"

import { Card } from "@/components/Card"
import { Logo } from "@/components/Logo"
import { NewGameForm } from "@/components/NewGameForm"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useHistoryStore, useHistoryStoreHydration } from "@/storage/historyStore"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import { ThemedStyle } from "@/theme/types"
import { formatDate } from "@/utils/formatDate"
import { formatTime } from "@/utils/formatTime"

export function HomepageScreen() {
  const { themed, theme } = useAppTheme()

  const { entries } = useHistoryStore()
  const hasHydrated = useHistoryStoreHydration()

  if (!hasHydrated) {
    return null
  }

  return (
    <Screen contentContainerStyle={$styles.flex1}>
      <ScrollView
        contentContainerStyle={themed({
          width: "100%",
          minHeight: "100%",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <SafeAreaView
          style={themed({
            width: "100%",
            gap: 64,
            padding: 16,
            paddingBottom: 64,
          })}
        >
          <View
            style={themed({
              alignItems: "center",
              justifyContent: "center",
            })}
          >
            <Logo size={200} variant="color" />
            <View style={themed({ flexDirection: "column", alignItems: "flex-start" })}>
              <Text
                style={themed({
                  textAlign: "center",
                  fontSize: 30,
                  lineHeight: 30,
                  textTransform: "uppercase",
                  color: theme.colors.tintInactive,
                })}
              >
                Just Another
              </Text>
              <Text
                style={themed({
                  textAlign: "center",
                  fontSize: 54,
                  lineHeight: 54,
                  textTransform: "uppercase",
                  color: theme.colors.tintInactive,
                })}
              >
                Sudoku
              </Text>
            </View>
          </View>

          <NewGameForm />

          {!entries || !entries.length ? (
            <View>
              <Text
                style={themed({ textAlign: "center" })}
                text="Your game history will display here."
              />
            </View>
          ) : (
            <View
              style={themed({
                width: "100%",
                gap: 32,
              })}
            >
              <Text size="xl" style={themed({ textAlign: "center" })} text="Game History" />
              {entries.toReversed().map((entry, index) => (
                <Card
                  key={index}
                  style={themed(({ colors }) => ({
                    backgroundColor: colors.sudokuPalette.cellBackgroundAlt,
                  }))}
                  heading={entry?.date ? new Date(entry.date).toLocaleDateString() : "No Date"}
                  headingStyle={themed({
                    textAlign: "center",
                    fontFamily: theme.typography.fonts.lexendDeca.light,
                  })}
                  ContentComponent={
                    <View style={themed($historyRow)}>
                      {entry.gameStatus === "won" && (
                        <View style={themed($historyCol)}>
                          <FontAwesome
                            name="trophy"
                            size={48}
                            color={theme.colors.sudokuPalette.cellTextAlt}
                          />
                          <Text size="xs" style={themed($historyStatLabel)} text="Won" />
                        </View>
                      )}
                      {entry.gameStatus === "lost" && (
                        <View style={themed($historyCol)}>
                          <FontAwesome
                            name="frown-o"
                            size={48}
                            color={theme.colors.sudokuPalette.cellText}
                          />
                          <Text size="xs" style={themed($historyStatLabel)} text="Lost" />
                        </View>
                      )}
                      <View style={themed($historyCol)}>
                        <View style={themed($historyStatValueWrapper)}>
                          <Text
                            size="xl"
                            adjustsFontSizeToFit
                            style={themed($historyStatValue)}
                            text={entry.difficulty}
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
                            // text={formatTime(entry.time)}
                            text="Time here"
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
                            text={entry.errorCount.toString()}
                          />
                        </View>
                        <Text size="xs" style={themed($historyStatLabel)} text="Errors" />
                      </View>
                    </View>
                  }
                />
              ))}
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
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
