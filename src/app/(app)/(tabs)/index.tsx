import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Container from "@/components/Container";
import { spacing } from "@/constants/DesignTokens";

export default function Index() {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
    >
      <Container style={styles.container}></Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    paddingBottom: 106,
    gap: spacing[64]
  }
});
