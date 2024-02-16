import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { base, spacing } from "@/constants/DesignTokens";

type ActionContentProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function ActionContent({
  icon,
  title,
  description
}: ActionContentProps) {
  return (
    <View style={styles.container}>
      {icon}

      <View style={styles.content}>
        <Heading size="heading4">{title}</Heading>

        <Paragraph style={styles.description} size="sm">
          {description}
        </Paragraph>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing[4],
    flexShrink: 1
  },
  content: {
    gap: spacing[8],
    flexShrink: 1
  },
  description: {
    color: base.grey[40]
  }
});
