import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";
import { FakeCurrencyInput } from "react-native-currency-input";

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
  value: number;
  error?: string;
  autoFocus?: boolean;
  onChange: (text: number) => void;
};

export default function CurrencyInput({
  currency,
  image,
  value,
  error,
  autoFocus,
  onChange
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
            testID="currency-logo"
          />
        </View>
      ) : null}

      <Label style={{ textTransform: "uppercase", marginTop: 7 }}>
        {currency}
      </Label>

      <FakeCurrencyInput
        value={value}
        onChangeValue={onChange}
        delimiter="."
        separator=","
        precision={2}
        keyboardAppearance="dark"
        style={styles.input}
        placeholder="0,00"
        placeholderTextColor={base.grey[40]}
        inputMode="decimal"
        autoFocus={autoFocus}
        caretColor={dark.fg.base}
        containerStyle={styles.fakeCurrencyInputContainerStyle}
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
  },
  fakeCurrencyInputContainerStyle: { flexShrink: 1 }
});
