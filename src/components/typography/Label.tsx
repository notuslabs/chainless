import { Text, StyleSheet } from "react-native";

import { fonts, base } from "@/constants/DesignTokens";

type BoldAndRegular<TSize extends string> = `${TSize}-${"bold" | "regular"}`;
type Size = BoldAndRegular<"lg" | "md" | "sm" | "xs">;

type LabelProps = {
  size?: Size;
};

type TextProps = LabelProps & Text["props"];

export default function Label({
  style,
  size = "lg-bold",
  ...otherProps
}: TextProps) {
  return <Text style={[styles.label, styles[size], style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.PlusJakartaSans_Bold,
    color: base.white
  },
  "lg-bold": {
    fontSize: 18,
    lineHeight: 18
  },
  "md-bold": {
    fontSize: 16,
    lineHeight: 16
  },
  "sm-bold": {
    fontSize: 14,
    lineHeight: 14
  },
  "xs-bold": {
    fontSize: 12,
    lineHeight: 12
  },
  "lg-regular": {
    fontFamily: fonts.PlusJakartaSans_Regular,
    fontSize: 18,
    lineHeight: 18
  },
  "md-regular": {
    fontFamily: fonts.PlusJakartaSans_Regular,
    fontSize: 16,
    lineHeight: 16
  },
  "sm-regular": {
    fontFamily: fonts.PlusJakartaSans_Regular,
    fontSize: 14,
    lineHeight: 14
  },
  "xs-regular": {
    fontFamily: fonts.PlusJakartaSans_Regular,
    fontSize: 12,
    lineHeight: 12
  }
});
