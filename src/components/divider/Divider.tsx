import { View, StyleSheet } from "react-native";

import { dark } from "@/constants/DesignTokens";

type DividerProps = {
  color?: string;
};

export default function Divider({ color }: DividerProps) {
  return (
    <View style={[styles.container, !!color && { backgroundColor: color }]} />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 1,
    backgroundColor: dark.border.subtle,
    flexShrink: 1
  }
});
