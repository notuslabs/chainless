import ArrowRightIcon from "@assets/icons/arrow-right.svg";
import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";

import { base, spacing } from "@/constants/DesignTokens";

type SettingsButtonProps = {
  children: ReactNode;
  trailingIcon?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function SettingsButton({
  children,
  trailingIcon,
  onPress
}: SettingsButtonProps) {
  return (
    <Pressable
      style={styles.container}
      android_ripple={{ color: "rgba(0, 0, 0, 0.2)" }}
      role="button"
      onPress={onPress}
    >
      {children}

      {trailingIcon ? trailingIcon : <ArrowRightIcon width={24} height={24} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[8],
    backgroundColor: base.grey[90],
    padding: spacing[16]
  }
});
