import { ReactNode } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  GestureResponderEvent
} from "react-native";

import Label from "@/components/typography/Label";
import { borderRadius, base, spacing } from "@/constants/DesignTokens";

type MenuButtonProps = {
  text: string;
  icon: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function MenuButton({ icon, text, onPress }: MenuButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable role="button" style={styles.pressable} onPress={onPress}>
        <View style={styles.circle}>{icon}</View>
      </Pressable>

      <Label size="xs-bold">{text}</Label>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[8],
    alignItems: "center",
    width: 72
  },
  pressable: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: base.grey[90],
    borderRadius: borderRadius.pill,
    alignItems: "center",
    justifyContent: "center"
  }
});
