import { View } from "react-native"
import { useMMKVString } from "react-native-mmkv"

import { Button } from "@/components/Button"
import { useAppTheme } from "@/theme/context"
import type { ThemeContextModeT } from "@/theme/types"
import { storage } from "@/utils/storage"

export interface ThemeToggleProps {}

/**
 * A simple theme toggle that cycles between light, dark, and system themes
 */
export function ThemeToggle(_props: ThemeToggleProps) {
  const { themed, setThemeContextOverride } = useAppTheme()
  const [storedThemeScheme] = useMMKVString("ignite.themeScheme", storage)

  // Get current theme mode
  const currentTheme: ThemeContextModeT = storedThemeScheme as ThemeContextModeT

  const updateAppTheme = (theme: ThemeContextModeT) => {
    setThemeContextOverride(theme)
  }

  return (
    <View
      style={themed({
        width: "100%",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
      })}
    >
      <Button
        preset={currentTheme === undefined ? "filled" : "default"}
        onPress={() => updateAppTheme(undefined)}
        style={themed({
          width: "33.333%",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        })}
        text="System"
      />
      <Button
        preset={currentTheme === "light" ? "filled" : "default"}
        onPress={() => updateAppTheme("light")}
        style={themed({
          width: "33.333%",
          borderLeftWidth: 0,
          borderRadius: 0,
        })}
        text="Light"
      />
      <Button
        preset={currentTheme === "dark" ? "filled" : "default"}
        onPress={() => updateAppTheme("dark")}
        style={themed({
          width: "33.333%",
          borderLeftWidth: 0,
          borderRadius: 0,
        })}
        text="Dark"
      />
    </View>
  )
}
