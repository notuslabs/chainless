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

type WithdrawMethodProps = {
  onSelectMethod: (event: SelectMethodEvent) => void;
};

export default function WithdrawMethod({
  onSelectMethod
}: WithdrawMethodProps) {
  return (
    <Container style={styles.container}>
      <Heading size="heading5">
        SELECIONE A FORMA QUE VOCÊ VAI FAZER A RETIRADA DO SALDO
      </Heading>

      <View style={{ gap: spacing[16] }}>
        <ListButton onPress={() => onSelectMethod({ type: "crypto" })}>
          <ActionContent
            icon={<BitcoinCryptoIcon />}
            title="Saque para carteira cripto"
            description="Lorem ipsum alea jacta est habeas corpus omnia et bovis et omnia"
          />
        </ListButton>

        <ListButton onPress={() => onSelectMethod({ type: "pix" })} disabled>
          <ActionContent
            icon={<PixIcon />}
            title="Saque por pix"
            description="Faça retiradas rapidamente em reais utilizando o Pix."
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
