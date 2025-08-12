import { View, StyleSheet } from "react-native"

import { SudokuScreen } from "@/screens/SudokuScreen"

export default function Tab() {
  return (
    <View style={styles.container}>
      <SudokuScreen />
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
