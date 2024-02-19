import ArrowLink from "@assets/icons/arrow-link.svg";
import { View, StyleSheet, Pressable, Linking } from "react-native";

import Label from "@/components/typography/Label";
import Paragraph from "@/components/typography/Paragraph";
import { dark, spacing } from "@/constants/DesignTokens";

type InformationsProps = {
  summary: string;
  site: string;
};

export default function Informations({ summary, site }: InformationsProps) {
  return (
    <View style={[styles.container]}>
      <Paragraph size="sm">{summary}</Paragraph>

      <View>
        <Pressable style={styles.link} onPress={() => Linking.openURL(site)}>
          <Label size="md-bold" style={styles.label}>
            Official site
          </Label>

          <ArrowLink />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing[16],
    gap: spacing[16]
  },
  listContainer: {
    gap: spacing[12]
  },
  contentView: { gap: spacing[4] },
  link: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    height: 40,
    paddingRight: 20
  },
  label: { color: dark.fg.link }
});
