import BitcoinCryptoIcon from "@assets/icons/bitcoin-crypto-icon.svg";
import PixIcon from "@assets/icons/pix.svg";
import { View, StyleSheet } from "react-native";

import Container from "@/components/Container";
import ListButton from "@/components/buttons/ListButton";
import ActionContent from "@/components/listItems/ActionContent";
import Heading from "@/components/typography/Heading";
import { spacing } from "@/constants/DesignTokens";

export type SelectMethodEvent = {
  type: "crypto" | "pix";
};

type DepositMethodProps = {
  onSelectMethod: (event: SelectMethodEvent) => void;
};

export default function DepositMethod({ onSelectMethod }: DepositMethodProps) {
  return (
    <Container style={styles.container}>
      <Heading size="heading5">
        SELECT THE CURRENCY IN WHICH THE DEPOSIT WILL BE MADE
      </Heading>

      <View style={{ gap: spacing[16] }}>
        <ListButton onPress={() => onSelectMethod({ type: "crypto" })}>
          <ActionContent
            icon={<BitcoinCryptoIcon />}
            title="Crypto Transfer"
            description="Lorem ipsum alea jacta est habeas corpus omnia et bovis et omnia"
          />
        </ListButton>

        <ListButton onPress={() => onSelectMethod({ type: "pix" })} disabled>
          <ActionContent
            icon={<PixIcon />}
            title="Deposit by Pix"
            description="Make deposits in reais quickly using Pix."
          />
        </ListButton>
      </View>
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
