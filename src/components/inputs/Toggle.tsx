import { Pressable, StyleSheet } from "react-native";

import Label from "@/components/typography/Label";
import { accent, borderRadius, dark, spacing } from "@/constants/DesignTokens";

export type ToggleEvent = { value: string; label: string };

type ToggleProps = {
  label: string;
  value: string;
  isActive: boolean;
  onPress: (event: ToggleEvent) => void;
};

export default function Toggle({
  label,
  value,
  isActive,
  onPress
}: ToggleProps) {
  return (
    <Pressable
      style={[
        styles.container,
        isActive ? styles.toggleActive : styles.toggleInactive
      ]}
      role="button"
      onPress={() => onPress({ value, label })}
    >
      <Label size="md-bold" style={[isActive && styles.labelActive]}>
        {label}
      </Label>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 58,
    height: 34,
    borderWidth: 1,
    borderRadius: borderRadius.small,
    paddingVertical: spacing[8],
    alignSelf: "flex-start",
    alignItems: "center"
  },
  toggleInactive: {
    borderColor: dark.fg.base,
    backgroundColor: dark.bg.canvas
  },
  toggleActive: {
    borderColor: accent.moderate,
    backgroundColor: accent.moderate
  },
  labelActive: {
    color: dark.fg["on-contrast"]
  }
});
