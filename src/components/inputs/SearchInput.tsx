import SearchIcon from "@assets/icons/search-icon.svg";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import {
  base,
  borderRadius,
  dark,
  fonts,
  spacing
} from "@/constants/DesignTokens";

type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export default function SearchInput({ value, onChangeText }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <SearchIcon />

      <TextInput
        keyboardAppearance="dark"
        style={styles.input}
        placeholder="Busca"
        placeholderTextColor={dark.fg.subtle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[16],
    height: 48,
    paddingHorizontal: spacing[16],
    borderRadius: borderRadius.small,
    backgroundColor: dark.bg.subtle
  },
  input: {
    flexShrink: 1,
    width: "100%",
    color: base.white,
    fontSize: 16,
    fontFamily: fonts.PlusJakartaSans_Regular
  }
});
