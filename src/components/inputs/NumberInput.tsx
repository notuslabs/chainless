import { Image } from "expo-image";
import { Noop } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import Label from "@/components/typography/Label";
import {
  borderRadius,
  base,
  borderWidth,
  spacing,
  fonts,
  dark
} from "@/constants/DesignTokens";

type NumberInputProps = {
  currency: string;
  image?: string;
  value: string;
  error?: string;
  autoFocus?: boolean;
  onChange: (text: string) => void;
  onBlur: Noop;
};

export default function NumberInput({
  currency,
  image,
  value,
  error,
  autoFocus,
  onChange,
  onBlur
}: NumberInputProps) {
  return (
    <View
      style={[
        styles.container,
        error ? { borderColor: dark.border.error } : null
      ]}
      testID="inputContainer"
    >
      {image ? (
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={image}
            contentFit="cover"
            accessibilityLabel="Currency logo"
          />
        </View>
      ) : null}

      <Label style={{ textTransform: "uppercase", marginTop: 7 }}>
        {currency}
      </Label>

      <TextInput
        keyboardAppearance="dark"
        style={styles.input}
        placeholder="0,00"
        placeholderTextColor={base.grey[40]}
        inputMode="decimal"
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4],
    width: "100%",
    height: 48,
    borderColor: base.grey[40],
    borderWidth: borderWidth.small,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing[16]
  },
  imageWrapper: {
    borderRadius: borderRadius.pill,
    overflow: "hidden",
    marginTop: 4
  },
  image: {
    width: 20,
    height: 20
  },
  input: {
    flexShrink: 1,
    textAlign: "right",
    width: "100%",
    color: base.white,
    fontSize: 18,
    fontFamily: fonts.PlusJakartaSans_Bold
  }
});
