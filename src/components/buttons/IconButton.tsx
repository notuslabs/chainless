import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";

import { accent, borderRadius, dark } from "@/constants/DesignTokens";

type IconButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function IconButton({
  children,
  disabled,
  backgroundColor,
  onPress
}: IconButtonProps) {
  return (
    <Pressable
      style={[
        styles.container,
        backgroundColor !== undefined && { backgroundColor },
        disabled && { backgroundColor: dark.bg.disabled }
      ]}
      onPress={onPress}
      disabled={disabled}
      role="button"
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: accent.moderate,
    borderRadius: borderRadius.small,
    height: 48,
    width: 48
  }
});
