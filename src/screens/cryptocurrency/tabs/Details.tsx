import ArrowLink from "@assets/icons/arrow-link.svg";
import { View, StyleSheet, Pressable, Linking } from "react-native";

import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import Paragraph from "@/components/typography/Paragraph";
import { base, dark, spacing } from "@/constants/DesignTokens";

type DetailsProps = {
  rank: number;
  marketcap: number;
  volume: number;
  circulatingSupply: number;
  ath: number;
  link: string;
};

export default function Details({
  rank,
  marketcap,
  volume,
  circulatingSupply,
  ath,
  link
}: DetailsProps) {
  return (
    <View style={styles.container}>
      <Heading size="heading3">Product Details</Heading>

      <View style={styles.contentView}>
        <Label size="sm-regular" style={styles.label}>
          Ranking
        </Label>

        <Paragraph size="md-bold">#{rank}</Paragraph>
      </View>

      <View style={styles.contentView}>
        <Label size="sm-regular" style={styles.label}>
          Market Cap
        </Label>

        <Paragraph size="md-bold">
          ${" "}
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 2
          }).format(marketcap)}
        </Paragraph>
      </View>

      <View style={styles.contentView}>
        <Label size="sm-regular" style={styles.label}>
          Volume (24 hours)
        </Label>

        <Paragraph size="md-bold">
          ${" "}
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 2
          }).format(volume)}
        </Paragraph>
      </View>

      <View style={styles.contentView}>
        <Label size="sm-regular" style={styles.label}>
          Circulating supply
        </Label>

        <Paragraph size="md-bold">
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 2
          }).format(circulatingSupply)}
        </Paragraph>
      </View>

      <View style={styles.contentView}>
        <Label size="sm-regular" style={styles.label}>
          All-time high
        </Label>

        <Paragraph size="md-bold">
          ${" "}
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 2
          }).format(ath)}
        </Paragraph>
      </View>

      <Pressable style={styles.link} onPress={() => Linking.openURL(link)}>
        <Label size="md-bold" style={styles.labelLink}>
          Learn more
        </Label>

        <ArrowLink />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing[16],
    gap: spacing[12]
  },
  contentView: {
    gap: spacing[4]
  },
  label: {
    color: base.grey[40]
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    height: 40,
    paddingRight: 20
  },
  labelLink: { color: dark.fg.link }
});
