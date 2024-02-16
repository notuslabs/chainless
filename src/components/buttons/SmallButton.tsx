import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";

import Label from "@/components/typography/Label";
import {
  borderRadius,
  borderWidth,
  base,
  spacing
} from "@/constants/DesignTokens";

type SmallButtonProps = {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function SmallButton({ text, onPress }: SmallButtonProps) {
  return (
    <Pressable style={styles.container} onPress={onPress} role="button">
      <Label size="xs-regular">{text}</Label>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[8],
    borderWidth: borderWidth.small,
    backgroundColor: base.grey[90],
    borderRadius: borderRadius.small
  }
});
