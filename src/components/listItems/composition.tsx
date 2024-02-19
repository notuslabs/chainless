import ArrowRightIcon from "@assets/icons/arrow-right.svg";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View, Pressable } from "react-native";

import Label from "@/components/typography/Label";
import Paragraph from "@/components/typography/Paragraph";
import { base } from "@/constants/DesignTokens";
import { CURRENCY_FORMAT } from "@/constants/configurations";

type CompositionProps = {
  name: string;
  id: string;
  amount: number;
  percentage: number;
};

export default function Composition({
  name,
  id,
  amount,
  percentage
}: CompositionProps) {
  return (
    <Pressable
      style={styles.content}
      onPress={() => router.push(`/cryptocurrency/${id}` as `http${string}`)}
    >
      <View style={styles.point} />
      <View style={styles.contentNameInvest}>
        <Paragraph size="md">{name}</Paragraph>
        <View style={styles.valueInvest}>
          <Paragraph style={{ marginRight: 8 }} size="md">
            {amount.toLocaleString("en-US", {
              ...CURRENCY_FORMAT,
              maximumFractionDigits: 6
            })}
          </Paragraph>
        </View>
      </View>
      <View>
        <View style={styles.percentageValue}>
          <Label size="md-bold">
            {percentage.toLocaleString("en-US", {
              style: "percent",
              minimumFractionDigits: 2
            })}
          </Label>
          <ArrowRightIcon />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    marginBottom: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: base.grey[80],
    gap: 8
  },
  contentNameInvest: {
    flex: 1,
    gap: 12,
    justifyContent: "flex-start"
  },
  valueInvest: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  point: {
    marginTop: 10,
    borderRadius: 50,
    width: 12,
    height: 12,
    backgroundColor: base.blue[60]
  },
  priceVariation: {
    flexDirection: "row"
  },
  percentageValue: {
    flexDirection: "row",
    alignItems: "center"
  }
});
