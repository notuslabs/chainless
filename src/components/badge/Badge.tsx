import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import Label from "@/components/typography/Label";
import { borderRadius, dark, spacing } from "@/constants/DesignTokens";

type LabelProps = { text: string; icon?: ReactNode };

type BadgeProps = LabelProps & View["props"];

export default function Badge({ style, text, icon }: BadgeProps) {
  return (
    <View style={[styles.content, style]}>
      {icon}
      <Label style={styles.text} size="xs-regular">
        {text}
      </Label>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    borderRadius: borderRadius.xSmall,
    paddingHorizontal: 10,
    paddingVertical: spacing[4],
    justifyContent: "center"
  },
  text: {
    color: dark.fg["on-contrast"]
  }
});
