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
        tx="howToPlayModal:buttonText"
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
                paddingHorizontal: platform.isPad ? theme.spacing.xl : theme.spacing.md,
                paddingTop: platform.isPad ? theme.spacing.xl : theme.spacing.md,
                paddingBottom: platform.isPad ? theme.spacing.xxl : theme.spacing.xl,
              })}
              ContentComponent={
                <View
                  style={themed({
                    gap: 16,
                  })}
                >
                  <Text
                    tx="howToPlayModal:title"
                    size={platform.isPad ? "xxl" : "xl"}
                    style={themed({ textAlign: "center" })}
                  />

                  <View
                    style={themed({
                      gap: 16,
                    })}
                  >
                    <Text
                      tx="howToPlayModal:step1title"
                      size={platform.isPad ? "xl" : "lg"}
                      style={themed({
                        textAlign: "center",
                        fontFamily: theme.typography.fonts.lexendDeca.regular,
                      })}
                    />
                    <Text
                      tx="howToPlayModal:step1desc"
                      size={platform.isPad ? "lg" : "sm"}
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
                      tx="howToPlayModal:step2title"
                      size={platform.isPad ? "xl" : "lg"}
                      style={themed({
                        textAlign: "center",
                        fontFamily: theme.typography.fonts.lexendDeca.regular,
                      })}
                    />
                    <Text
                      tx="howToPlayModal:step2bullet1"
                      size={platform.isPad ? "lg" : "sm"}
                      style={themed({
                        textAlign: "center",
                        fontFamily: theme.typography.fonts.lexendDeca.light,
                      })}
                    />
                    <Text
                      tx="howToPlayModal:step2bullet2"
                      size={platform.isPad ? "lg" : "sm"}
                      style={themed({
                        textAlign: "center",
                        fontFamily: theme.typography.fonts.lexendDeca.light,
                      })}
                    />
                    <Text
                      tx="howToPlayModal:step2bullet2"
                      size={platform.isPad ? "lg" : "sm"}
                      style={themed({
                        textAlign: "center",
                        fontFamily: theme.typography.fonts.lexendDeca.light,
                      })}
                    />
                  </View>

                  <View style={themed({ alignItems: "center" })}>
                    <View>
                      <Button tx="common:okay" preset="3d" onPress={() => setIsOpen(false)} />
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
                <Text style={themed({ color: theme.colors.textDim })} tx="common:close" />
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
