import { useEffect } from "react"

import { Text } from "@/components/Text"
import { useGameStore } from "@/storage/gameStore"

export function GameTimer() {
  const { timer, tick } = useGameStore()

  useEffect(() => {
    const interval = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [tick])

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`

  return <Text text={`Time: ${formatTime(timer)}`} />
}
