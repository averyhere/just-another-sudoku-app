import { useEffect, useState } from "react"
import type { ViewStyle, TextStyle } from "react-native"
import { View, Modal, Pressable } from "react-native"
import { BlurView } from "expo-blur"
import FontAwesome from "@expo/vector-icons/FontAwesome"

import { Card } from "@/components/Card"
import { NewGameForm } from "@/components/NewGameForm"
import { Text } from "@/components/Text"
import { useGameStore, useGameStoreHydration } from "@/storage/gameStore"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { formatTime } from "@/utils/formatTime"

export function GameOverModal() {
  const [showModal, setShowModal] = useState<null | "won" | "lost">(null)
  const { themed, theme } = useAppTheme()
  const hasHydrated = useGameStoreHydration()
  const gameStatus = useGameStore((s) => s.gameStatus)
  const difficulty = useGameStore((s) => s.difficulty)
  const timer = useGameStore((s) => s.timer)
  const errorCount = useGameStore((s) => s.errorCount)

  useEffect(() => {
    if (gameStatus === "won") {
      setShowModal("won")
    } else if (gameStatus === "lost") {
      setShowModal("lost")
    }
  }, [gameStatus])

  if (!hasHydrated) {
    return null
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal === null ? false : true}
      onRequestClose={() => {
        setShowModal(null)
      }}
      onDismiss={() => {
        setShowModal(null)
      }}
    >
      <BlurView
        style={themed({
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <View
          style={themed({
            width: "80%",
            gap: 18,
          })}
        >
          <Card
            style={themed({
              padding: theme.spacing.md,
            })}
            ContentComponent={
              <View
                style={themed({
                  gap: 16,
                })}
              >
                <View>
                  {gameStatus === "won" ? (
                    <View style={themed($historyCol)}>
                      <FontAwesome name="trophy" size={48} color={theme.colors.palette.blue} />
                      <Text size="xl" style={themed($title)} text="Congratulations!" />
                    </View>
                  ) : (
                    <View style={themed($historyCol)}>
                      <FontAwesome name="frown-o" size={48} color="red" />
                      <Text size="xl" style={themed($title)} text="Better luck next time!" />
                    </View>
                  )}
                </View>
                <View style={themed($historyRow)}>
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
                        text={formatTime(timer)}
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
              </View>
            }
          />

          <Card
            style={themed({
              paddingTop: theme.spacing.md,
              paddingBottom: theme.spacing.xl,
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
            })}
            ContentComponent={
              <View>
                <Text size="lg" style={themed({ textAlign: "center" })} text="Play again?" />
                <NewGameForm onStartNewGame={() => setShowModal(null)} />
              </View>
            }
          />

          <Pressable
            onPress={() => setShowModal(null)}
            style={themed({
              paddingTop: theme.spacing.md,
              paddingBottom: theme.spacing.xl,
              paddingLeft: theme.spacing.md,
              paddingRight: theme.spacing.md,
            })}
          >
            <View
              style={themed({
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              })}
            >
              <FontAwesome name="close" size={24} color={theme.colors.textDim} />
              <Text style={themed({ color: theme.colors.textDim })}>Close</Text>
            </View>
          </Pressable>
        </View>
      </BlurView>
    </Modal>
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
const $title: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  color: colors.text,
  textAlign: "center",
  fontFamily: typography.fonts.lexendDeca.light,
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
