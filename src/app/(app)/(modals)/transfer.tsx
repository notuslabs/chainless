import { StyleSheet } from "react-native";

import Container from "@/components/Container";
import Label from "@/components/typography/Label";
import { spacing } from "@/constants/DesignTokens";

export default function Transfer() {
  return (
    <Container style={styles.container}>
      <Label>Transfer is under construction!</Label>
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
