import ArrowRightIcon from "@assets/icons/arrow-right.svg";
import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";

import { base, spacing } from "@/constants/DesignTokens";

type ListButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function ListButton({
  children,
  disabled = false,
  onPress
}: ListButtonProps) {
  return (
    <Pressable
      style={[styles.container, disabled && { opacity: 0.5 }]}
      disabled={disabled}
      onPress={onPress}
      testID="ListButton"
    >
      {children}

      <ArrowRightIcon />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: base.grey[90],
    borderRadius: spacing[8],
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing[8],
    padding: spacing[16]
  }
});
