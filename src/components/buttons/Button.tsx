import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";

import Label from "@/components/typography/Label";
import { accent, borderRadius, dark, spacing } from "@/constants/DesignTokens";

type ButtonProps = {
  text: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  color?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function Button({
  text,
  leadingIcon,
  trailingIcon,
  disabled,
  backgroundColor = accent.moderate,
  color = dark.fg["on-contrast"],
  onPress
}: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.container,
        styles.fullWidth,
        { backgroundColor },
        disabled && { backgroundColor: dark.bg.disabled }
      ]}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: "rgba(0, 0, 0, 0.2)" }}
      role="button"
    >
      {leadingIcon}

      <Label
        size="md-bold"
        style={[{ color }, disabled && { color: dark.fg.disabled }]}
      >
        {text}
      </Label>

      {trailingIcon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: borderRadius.small
  },
  fullWidth: {
    width: "100%",
    height: 48,
    paddingHorizontal: 32,
    paddingVertical: 16,
    justifyContent: "center",
    gap: spacing[8]
  }
});
