import AlertTriangleIcon from "@assets/icons/alert-triangle.svg";
import { View, StyleSheet } from "react-native";

import Paragraph from "@/components/typography/Paragraph";
import { dark, borderRadius, spacing, fonts } from "@/constants/DesignTokens";

type WarningCardProps = {
  text: string;
};

export default function WarningCard({ text }: WarningCardProps) {
  return (
    <View style={styles.container}>
      <AlertTriangleIcon />
      <Paragraph
        size="sm"
        style={{
          color: dark.fg["on-contrast"],
          fontFamily: fonts.PlusJakartaSans_Bold,
          flexShrink: 1
        }}
      >
        {text}
      </Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: spacing[12],
    padding: spacing[16],
    backgroundColor: dark.bg["warning-contrast"],
    borderRadius: borderRadius.medium
  }
});
