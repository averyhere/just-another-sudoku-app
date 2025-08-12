import { View, StyleSheet } from "react-native"

import { HomepageScreen } from "@/screens/HomepageScreen"

export default function Tab() {
  return (
    <View style={styles.container}>
      <HomepageScreen />
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
