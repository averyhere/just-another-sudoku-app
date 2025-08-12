import { View } from "react-native"

import { Button } from "@/components/Button"
import { useGameStore, useGameStoreHydration } from "@/storage/gameStore"
import { useHistoryStore } from "@/storage/historyStore"
import { useAppTheme } from "@/theme/context"

export function SudokuControls() {
  const { themed, theme } = useAppTheme()
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

  // const handleAutofill = () => {
  //   if (!puzzle || !solution) return
  //   const newPuzzle = solution
  //   newPuzzle[solution.length - 1] = "-"
  //   setPuzzle(newPuzzle)
  // }

  const handleSetValue = (value: string) => {
    if (isPaused) resume()
    if (!puzzle) return
    if (!value) return
    if (!pointer) return
    if (originalPuzzle![pointer.index] !== "-") return
    if (!solution) return

    const newPuzzle = puzzle
    newPuzzle[pointer.index] = value
    setPuzzle(newPuzzle)

    if (
      difficulty !== "easy" &&
      newPuzzle[pointer.index] !== solution[pointer.index] &&
      value !== "-"
    ) {
      incrementErrorCount()
      if (errorCount >= 5) {
        pause()
        setGameStatus("lost")
        addEntry({
          date: new Date(),
          difficulty: difficulty!,
          puzzle: puzzle,
          originalPuzzle: originalPuzzle!,
          solution: solution,
          timer: timer,
          errorCount: errorCount,
          gameStatus: gameStatus as string,
        })
      }
    }

    if (newPuzzle === solution) {
      pause()
      setGameStatus("won")
      addEntry({
        date: new Date(),
        difficulty: difficulty!,
        puzzle: puzzle,
        originalPuzzle: originalPuzzle!,
        solution: solution,
        timer: timer,
        errorCount: errorCount,
        gameStatus: gameStatus as string,
      })
    }
  }

  return (
    <View>
      <View
        style={themed({
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        })}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            preset="cell"
            style={themed({
              width: "11.111%",
              aspectRatio: 1 / 2,
              borderRadius: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              borderWidth: 0,
            })}
            textStyle={themed({
              fontFamily: "LexendDeca_100Thin",
              fontWeight: 100,
              color: theme.colors.text,
              fontSize: 52,
              lineHeight: 52,
              textAlign: "center",
            })}
            pressedStyle={themed({
              backgroundColor: "transparent",
              paddingTop: 16,
            })}
            disabledStyle={themed({
              opacity: 0.35,
            })}
            disabledTextStyle={themed({
              color: theme.colors.textDim,
            })}
            pressedTextStyle={themed({})}
            onPress={() => handleSetValue(num.toString())}
            disabled={puzzle?.toString().match(new RegExp(`${num}`, "g"))?.length === 9}
            aria-disabled={puzzle?.toString().match(new RegExp(`${num}`, "g"))?.length === 9}
            text={num.toString()}
          />
        ))}
      </View>
      <View
        style={themed({
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
          disabled={!pointer || gameStatus !== null}
          disabledStyle={themed({
            opacity: 0.5,
          })}
          disabledTextStyle={themed({
            color: theme.colors.textDim,
          })}
        />
      </View>
      {/*{process.env.NODE_ENV === "development" && (
        <View
          style={themed({
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
          })}
        >
          <Button onPress={() => handleAutofill()} text="Autofill" />
        </View>
      )}*/}
      <View
        style={themed({
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        })}
      ></View>
    </View>
  )
}
