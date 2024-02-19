import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import Container from "@/components/Container";
import Divider from "@/components/divider/Divider";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { spacing } from "@/constants/DesignTokens";

export default function Payments() {
  return (
    <Container style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/images/Imagem_em_construcao.png")}
        contentFit="cover"
      />

      <View>
        <Heading size="heading5" style={{ marginBottom: spacing[8] }}>
          Under construction
        </Heading>

        <Paragraph size="sm" style={{ marginBottom: spacing[12] }}>
          The payments area is going through the research and development.
        </Paragraph>

        <Divider />

        <Paragraph
          size="sm"
          style={{ marginTop: spacing[8], textAlign: "right" }}
        >
          Chainless
        </Paragraph>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[24],
    gap: spacing[24]
  },
  image: {
    width: 320,
    alignSelf: "center",
    aspectRatio: 560 / 671
  }
});
