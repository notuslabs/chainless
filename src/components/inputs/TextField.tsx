import { ReactNode } from "react";
import { Noop } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import {
  borderRadius,
  base,
  borderWidth,
  spacing,
  fonts,
  dark
} from "@/constants/DesignTokens";

type TextFieldProps = {
  value: string;
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
  onChange: (text: string) => void;
  onBlur?: Noop;
  inputMode?:
    | "decimal"
    | "email"
    | "none"
    | "numeric"
    | "search"
    | "tel"
    | "text"
    | "url";
};

export default function TextField({
  placeholder,
  icon,
  value,
  error,
  inputMode = "text",
  onChange,
  onBlur
}: TextFieldProps) {
  return (
    <View
      style={[
        styles.container,
        error ? { borderColor: dark.border.error } : null
      ]}
      testID="textField"
    >
      {icon}

      <TextInput
        keyboardAppearance="dark"
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={base.grey[40]}
        inputMode={inputMode}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[12],
    width: "100%",
    height: 48,
    borderColor: base.grey[40],
    borderWidth: borderWidth.small,
    borderRadius: borderRadius.medium,
    paddingHorizontal: spacing[12]
  },
  input: {
    flexShrink: 1,
    width: "100%",
    color: base.white,
    fontSize: 16,
    fontFamily: fonts.PlusJakartaSans_Regular
  }
});
