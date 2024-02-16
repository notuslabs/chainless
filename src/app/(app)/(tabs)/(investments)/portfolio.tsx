import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { dark, spacing } from "@/constants/DesignTokens";

export default function Investments() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    ></ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark.bg.canvas,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[24]
  },
  infoContainer: {
    height: 158,
    justifyContent: "center"
  },
  composition: {
    marginTop: 32,
    marginBottom: 16
  }
});
