import GrowthIcon from "@assets/icons/growth.svg";
import SavingIcon from "@assets/icons/saving.svg";
import { router } from "expo-router";
import { View, StyleSheet } from "react-native";

import ListButton from "@/components/buttons/ListButton";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { dark, base, spacing } from "@/constants/DesignTokens";

export default function Investments() {
  return (
    <View style={styles.container}>
      <Heading size="heading5">FINANCIAL ASSETS</Heading>

      <ListButton onPress={() => router.push("/cryptocurrency/")}>
        <View style={styles.buttonContent}>
          <View style={styles.titleContainer}>
            <GrowthIcon width={24} height={24} />

            <Heading size="heading4">Cryptocurrencies</Heading>
          </View>

          <Paragraph size="sm" style={{ color: base.grey[40] }}>
            Investment products that use decentralized digital currencies.
          </Paragraph>
        </View>
      </ListButton>

      <ListButton disabled>
        <View style={styles.buttonContent}>
          <View style={styles.titleContainer}>
            <SavingIcon width={24} height={24} />

            <Heading size="heading4">Fixed Income</Heading>
          </View>

          <Paragraph size="sm" style={{ color: base.grey[40] }}>
            Investment products with low risk and predictable returns.
          </Paragraph>
        </View>
      </ListButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark.bg.canvas,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[24],
    gap: spacing[16]
  },
  buttonContent: {
    gap: spacing[8],
    flexShrink: 1
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4]
  }
});
