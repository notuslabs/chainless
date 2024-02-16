import { View, StyleSheet } from "react-native";

import { dark, borderRadius } from "@/constants/DesignTokens";

type ViewProps = View["props"];

export default function Container({ style, ...otherProps }: ViewProps) {
  return <View style={[styles.container, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark.bg.canvas,
    borderTopLeftRadius: borderRadius.large,
    borderTopRightRadius: borderRadius.large
  }
});
