import { Text, StyleSheet } from "react-native";

import { fonts, base } from "@/constants/DesignTokens";

type HeadingProps = {
  size?: `heading${1 | 2 | 3 | 4 | 5 | 6}`;
};

type TextProps = HeadingProps & Text["props"];

export default function Heading({
  style,
  size = "heading1",
  ...otherProps
}: TextProps) {
  return <Text style={[styles.heading, styles[size], style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.PlusJakartaSans_Bold,
    color: base.white
  },
  heading1: {
    fontSize: 32,
    lineHeight: 38.4
  },
  heading2: {
    fontSize: 24,
    lineHeight: 28.8
  },
  heading3: {
    fontSize: 18,
    lineHeight: 21.6
  },
  heading4: {
    fontSize: 16,
    lineHeight: 19.2
  },
  heading5: {
    fontSize: 14,
    lineHeight: 16.8
  },
  heading6: {
    fontSize: 12,
    lineHeight: 14.4
  }
});
