import { View, ViewStyle } from "react-native"
import type { ThemedStyle } from "@/theme/types"
import { Button } from "@/components/Button"
import { useGameStore, useGameStoreHydration } from "@/storage/gameStore"
import { useHistoryStore } from "@/storage/historyStore"
import { useAppTheme } from "@/theme/context"
import { useState } from "react"

export function SudokuControls() {
  const { themed, theme, platform } = useAppTheme()
  const hasHydrated = useGameStoreHydration()
  const { addEntry } = useHistoryStore()
  const {
    puzzle,
    originalPuzzle,
    pointer,
    difficulty,
    pause,
    solution,
    setPuzzle,
    clearPointer,
    incrementErrorCount,
    isPaused,
    timer,
    gameStatus,
    errorCount,
    resume,
    setGameStatus,
  } = useGameStore()

  if (!hasHydrated) {
    return null
  }

  const handleAutofill = () => {
    if (!puzzle || !solution) return
    const newPuzzle = solution
    newPuzzle[solution.length - 1] = "-"
    setPuzzle(newPuzzle)
  }

  const handleSetValue = (value: string) => {
    if (!puzzle) return
    if (!value) return
    if (!pointer) return
    if (originalPuzzle![pointer.index] !== "-") return
    if (!solution) return

    if (isPaused) resume()

    const newPuzzle = puzzle
    newPuzzle[pointer.index] = value
    setPuzzle(newPuzzle)

    if (newPuzzle.join("") === solution.join("")) {
      pause()
      addEntry({
        date: new Date(),
        difficulty: difficulty!,
        puzzle: puzzle,
        originalPuzzle: originalPuzzle!,
        solution: solution,
        timer: timer,
        errorCount: errorCount,
        gameStatus: "won",
      })
      setGameStatus("won")
    }

    if (newPuzzle[pointer.index] !== solution[pointer.index] && value !== "-") {
      incrementErrorCount()
      // note: 4 because this makes it "on the fifth mistake"
      if (difficulty !== "easy" && errorCount >= 4) {
        pause()
        addEntry({
          date: new Date(),
          difficulty: difficulty!,
          puzzle: puzzle,
          originalPuzzle: originalPuzzle!,
          solution: solution,
          timer: timer,
          errorCount: errorCount,
          gameStatus: "lost",
        })
        setGameStatus("lost")
      }
    }
  }

  return (
    <View style={themed({ alignItems: "center", justifyContent: "center" })}>
      <View style={themed(platform.isPad && platform.isLandscape ? $numPadLayout : $defaultLayout)}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            preset="cell"
            style={themed(platform.isPad && platform.isLandscape ? $numPadButton : $defaultButton)}
            textStyle={themed({
              fontFamily: "LexendDeca_100Thin",
              fontWeight: 100,
              color: theme.colors.text,
              fontSize: platform.isPad ? 64 : 32,
              lineHeight: platform.isPad ? 78 : 48,
              textAlign: "center",
            })}
            pressedStyle={themed({
              backgroundColor: theme.colors.sudokuPalette.cellBackgroundAlt,
              paddingTop: 16,
            })}
            disabledStyle={themed({
              opacity: 0.35,
            })}
            disabledTextStyle={themed({
              color: theme.colors.textDim,
            })}
            pressedTextStyle={themed({
              color: theme.colors.tint,
            })}
            onPress={() => handleSetValue(num.toString())}
            disabled={puzzle?.toString().match(new RegExp(`${num}`, "g"))?.length === 9}
            aria-disabled={puzzle?.toString().match(new RegExp(`${num}`, "g"))?.length === 9}
            text={num.toString()}
          />
        ))}
      </View>
      <View
        style={themed({
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Button
          preset="default"
          onPress={() => {
            clearPointer()
            handleSetValue("-")
          }}
          text="Clear Value"
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
          disabled={!pointer || gameStatus !== "playing"}
          disabledStyle={themed({
            opacity: 0.5,
          })}
          disabledTextStyle={themed({
            color: theme.colors.textDim,
          })}
        />
      </View>
    </View>
  )
}

const $defaultLayout: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  flexDirection: "row",
  flexWrap: "nowrap",
})

const $numPadLayout: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "100%",
  maxWidth: 360,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignContent: "space-between",
})
const $defaultButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: "11.111%",
  aspectRatio: 1 / 2,
  borderRadius: 0,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
})

const $numPadButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: "30%",
  aspectRatio: 1,
  borderRadius: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  marginVertical: 16,
})
