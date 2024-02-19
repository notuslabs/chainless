import CheckCircleIcon from "@assets/icons/check-circle.svg";
import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import Button from "@/components/buttons/Button";
import Heading from "@/components/typography/Heading";
import { spacing } from "@/constants/DesignTokens";

type TransactionSuccessProps = {
  title: string;
  buttonLabel: string;
  children: ReactNode;
  onBack: () => void;
};

export default function TransactionSuccess({
  title,
  buttonLabel,
  children,
  onBack
}: TransactionSuccessProps) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10
        }}
      >
        <CheckCircleIcon />

        <Heading size="heading2" style={{ flexShrink: 1 }}>
          {title}
        </Heading>
      </View>

      <View style={{ flex: 1, paddingHorizontal: spacing[24] }}>
        {children}
      </View>

      <View
        style={{
          paddingHorizontal: spacing[16]
        }}
      >
        <Button text={buttonLabel} onPress={onBack} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing[24],
    paddingBottom: spacing[16]
  }
});
