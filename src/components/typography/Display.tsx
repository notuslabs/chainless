import { Text, StyleSheet } from "react-native";

import { fonts, base } from "@/constants/DesignTokens";

type DisplayProps = { size?: "display1" | "display2" };

type TextProps = DisplayProps & Text["props"];

export default function Display({
  style,
  size = "display1",
  ...otherProps
}: TextProps) {
  return <Text style={[styles.display, styles[size], style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  display: {
    fontFamily: fonts.PlusJakartaSans_Bold,
    color: base.white
  },
  display1: {
    fontSize: 64,
    lineHeight: 76.8
  },
  display2: {
    fontSize: 40,
    lineHeight: 48
  }
});
