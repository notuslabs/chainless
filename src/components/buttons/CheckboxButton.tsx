import { Image } from "expo-image";
import { Skeleton } from "moti/skeleton";
import { Pressable, StyleSheet, View } from "react-native";

import Label from "../typography/Label";

import {
  accent,
  base,
  borderRadius,
  dark,
  spacing
} from "@/constants/DesignTokens";
import { SIMPLE_CURRENCY_FORMAT } from "@/constants/configurations";

type CheckboxButtonProps = {
  label: string;
  amount: number;
  image: string;
  checked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onChange?: () => void;
};

export default function CheckboxButton({
  label,
  amount,
  image,
  checked,
  disabled,
  loading,
  onChange
}: CheckboxButtonProps) {
  return (
    <Pressable
      style={[
        styles.container,
        checked && styles.checked,
        disabled && { opacity: 0.5 }
      ]}
      disabled={disabled}
      onPress={onChange}
      testID="ListButton"
    >
      <View style={[styles.radioContainer, checked && styles.checked]}>
        {checked && <View style={styles.checkmark} />}
      </View>

      <View style={styles.labelContainer}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={image} contentFit="cover" />
        </View>

        <Label size="md-bold" style={{ marginTop: 3 }}>
          {label}
        </Label>
      </View>

      <View style={{ marginLeft: "auto" }}>
        <Skeleton
          colors={[base.grey[80], base.grey[60], base.grey[80]]}
          height={18}
          width={50}
          radius={borderRadius.small}
        >
          {loading ? null : (
            <Label style={{ marginLeft: "auto" }}>
              {amount.toLocaleString("pt-BR", SIMPLE_CURRENCY_FORMAT)}
            </Label>
          )}
        </Skeleton>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing[8],
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[24],
    backgroundColor: base.grey[90],
    borderWidth: 1,
    borderColor: base.grey[90],
    borderRadius: spacing[8]
  },
  radioContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: dark.border.muted,
    borderRadius: borderRadius.pill
  },
  checked: {
    borderColor: accent.moderate
  },
  checkmark: {
    backgroundColor: accent.moderate,
    width: 12,
    height: 12,
    borderRadius: borderRadius.pill
  },
  labelContainer: {
    flexDirection: "row",
    gap: spacing[4]
  },
  imageWrapper: {
    borderRadius: borderRadius.pill,
    overflow: "hidden"
  },
  image: {
    width: 20,
    aspectRatio: 1
  }
});
