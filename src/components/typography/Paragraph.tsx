import { Text, StyleSheet } from "react-native";

import { fonts, base } from "@/constants/DesignTokens";

type BoldAndRegular<TSize extends string> = `${TSize}${"-bold" | ""}`;
type Size = BoldAndRegular<"lg" | "md" | "sm" | "xs">;
type ParagraphProps = { size?: Size };

type TextProps = ParagraphProps & Text["props"];

export default function Paragraph({
  style,
  size = "lg",
  ...otherProps
}: TextProps) {
  return (
    <Text style={[styles.paragraph, styles[size], style]} {...otherProps} />
  );
}

const styles = StyleSheet.create({
  paragraph: {
    fontFamily: fonts.PlusJakartaSans_Regular,
    color: base.white
  },
  lg: {
    fontSize: 18,
    lineHeight: 27
  },
  md: {
    fontSize: 16,
    lineHeight: 24
  },
  sm: {
    fontSize: 14,
    lineHeight: 21
  },
  xs: {
    fontSize: 12,
    lineHeight: 18
  },
  "lg-bold": {
    fontFamily: fonts.PlusJakartaSans_Bold,
    fontSize: 18,
    lineHeight: 27
  },
  "md-bold": {
    fontFamily: fonts.PlusJakartaSans_Bold,
    fontSize: 16,
    lineHeight: 24
  },
  "sm-bold": {
    fontFamily: fonts.PlusJakartaSans_Bold,
    fontSize: 14,
    lineHeight: 21
  },
  "xs-bold": {
    fontFamily: fonts.PlusJakartaSans_Bold,
    fontSize: 12,
    lineHeight: 18
  }
});
