import { View, StyleSheet } from "react-native"

import { SettingsScreen } from "@/screens/SettingsScreen"

export default function Tab() {
  return (
    <View style={styles.container}>
      <SettingsScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
})
