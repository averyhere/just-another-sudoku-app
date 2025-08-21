import { useEffect, useState } from "react"
import type { ViewStyle, TextStyle } from "react-native"
import { View, Modal, Pressable, StyleSheet } from "react-native"
import { BlurView } from "expo-blur"
import FontAwesome from "@expo/vector-icons/FontAwesome"

import { Card } from "@/components/Card"
import { NewGameForm } from "@/components/NewGameForm"
import { Text } from "@/components/Text"
import { useGameStore, useGameStoreHydration } from "@/storage/gameStore"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { formatTime } from "@/utils/formatTime"
import { Button } from "./Button"

export function HowToPlayModal() {
  const { themed, theme, platform } = useAppTheme()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <View>
      <Button
        text="How to Play"
        onPress={() => setIsOpen(!isOpen)}
        preset="default"
        style={themed({
          backgroundColor: "transparent",
          borderRadius: 0,
          borderWidth: 0,
          padding: 0,
          margin: 0,
        })}
        textStyle={themed({
          color: theme.colors.text,
          fontFamily: theme.typography.fonts.lexendDeca.light,
          fontWeight: 200,
          textAlign: "center",
          letterSpacing: 0.4,
        })}
      />

      <Modal
        animationType="fade"
        visible={isOpen}
        transparent={true}
        presentationStyle="overFullScreen"
        style={themed({
          justifyContent: "center",
          alignItems: "center",
        })}
        onRequestClose={() => {
          setIsOpen(false)
        }}
        onDismiss={() => {
          setIsOpen(false)
        }}
      >
        <BlurView
          style={[
            StyleSheet.absoluteFill,
            themed({
              justifyContent: "center",
              alignItems: "center",
            }),
          ]}
        >
          <View
            style={themed({
              width: "80%",
              gap: 18,
            })}
          >
            <Card
              style={themed({
                paddingHorizontal: platform.isPad ? theme.spacing.xxl : theme.spacing.md,
                paddingTop: platform.isPad ? theme.spacing.xxl : theme.spacing.md,
                paddingBottom: platform.isPad ? theme.spacing.xxxl : theme.spacing.xl,
              })}
              ContentComponent={
                <View
                  style={themed({
                    gap: 16,
                  })}
                >
                  <Text
                    text="How to play Sudoku"
                    size="xxl"
                    style={themed({ textAlign: "center" })}
                  />

                  <View
                    style={themed({
                      gap: 16,
                    })}
                  >
                    <Text
                      text="1. Understand the Grid"
                      size="xl"
                      style={themed({
                        textAlign: "center",
                        fontFamily: theme.typography.fonts.lexendDeca.regular,
                      })}
                    />
                    <Text
                      text="The 9x9 grid is divided into nine 3x3 subgrids."
                      size="lg"
                      style={themed({
                        textAlign: "center",
                        fontFamily: theme.typography.fonts.lexendDeca.light,
                      })}
                    />
                  </View>

                  <View
                    style={themed({
                      gap: 16,
                    })}
                  >
                    <Text
                      text="2. Basic Rules:"
                      size="xl"
                      style={themed({
                        textAlign: "center",
                        fontFamily: theme.typography.fonts.lexendDeca.regular,
                      })}
                    />
                    <Text
                      text="Each row must contain the numbers 1-9, without any repetition."
                      size="lg"
                      style={themed({
                        textAlign: "center",
                        fontFamily: theme.typography.fonts.lexendDeca.light,
                      })}
                    />
                    <Text
                      text="Each column must contain the numbers 1-9, without any repetition."
                      size="lg"
                      style={themed({
                        textAlign: "center",
                        fontFamily: theme.typography.fonts.lexendDeca.light,
                      })}
                    />
                    <Text
                      text="Each of the nine 3x3 subgrids must contain the numbers 1-9, without any repetition."
                      size="lg"
                      style={themed({
                        textAlign: "center",
                        fontFamily: theme.typography.fonts.lexendDeca.light,
                      })}
                    />
                  </View>

                  <View style={themed({ alignItems: "center" })}>
                    <View>
                      <Button text="Okay" preset="3d" onPress={() => setIsOpen(false)} />
                    </View>
                  </View>
                </View>
              }
            />

            <Pressable
              onPress={() => setIsOpen(false)}
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
    </View>
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
