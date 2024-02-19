import { StyleSheet } from "react-native";

import Container from "@/components/Container";
import Label from "@/components/typography/Label";
import { spacing } from "@/constants/DesignTokens";

export default function Convert() {
  return (
    <Container style={styles.container}>
      <Label>Convert is under construction!</Label>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: spacing[24]
  }
});
