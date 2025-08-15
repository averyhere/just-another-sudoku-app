import { View } from "react-native"
import { BlurView } from "expo-blur"
import { Tabs } from "expo-router"
import FontAwesome from "@expo/vector-icons/FontAwesome"

import { Logo } from "@/components/Logo"
import { useAppTheme } from "@/theme/context"

export default function TabLayout() {
  const { theme, themed } = useAppTheme()

  return (
    <Tabs
      screenOptions={() => ({
        swipeEnabled: true,
        tabBarBackground: () => (
          <View style={themed({ flex: 1 })}>
            <BlurView intensity={20} tint="default" style={themed({ flex: 1 })} />
          </View>
        ),
        tabBarActiveTintColor: theme.colors.tint,
        tabBarInactiveTintColor: theme.colors.textDim,
        tabBarStyle: {
          position: "absolute", // Absolute positioning required for the blur effect
          backgroundColor: "transparent",
          borderTopWidth: 0,
        },
        tabBarVariant: "uikit",
        animation: "shift",
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarAccessibilityLabel: "Dashboard",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="dashboard" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="gameboard"
        options={{
          title: "Play Sudoku",
          tabBarAccessibilityLabel: "Sudoku game",
          tabBarIcon: ({ focused }) => <Logo size={36} variant={focused ? "color" : "tinted"} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="gamecenter"
        options={{
          title: "Game Center",
          tabBarAccessibilityLabel: "Game Center",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="trophy" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarAccessibilityLabel: "Settings",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  )
}
