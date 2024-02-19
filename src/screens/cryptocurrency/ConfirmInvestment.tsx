import { PriceRoute } from "@notuslabs/wallet";
import BigNumber from "bignumber.js";
import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import Container from "@/components/Container";
import Button from "@/components/buttons/Button";
import Divider from "@/components/divider/Divider";
import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import { borderRadius, base, spacing, dark } from "@/constants/DesignTokens";
import { SIMPLE_CURRENCY_FORMAT } from "@/constants/configurations";

type ConfirmInvestmentProps = {
  transactionType: "invest" | "redeem";
  tokenIn: {
    symbol: string;
    image: string;
    change?: number;
  };
  tokenOut: {
    symbol: string;
    image: string;
    change?: number;
  };
  quote: PriceRoute;
  handleConfirm: () => void;
};

export default function ConfirmInvestment({
  transactionType,
  tokenIn,
  tokenOut,
  quote,
  handleConfirm
}: ConfirmInvestmentProps) {
  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(400)}>
      <Container style={styles.container}>
        <View style={{ gap: spacing[16] }}>
          <Heading size="heading5">
            {transactionType === "invest"
              ? "DETALHES DA APLICAÇÃO EM CRIPTOMOEDA"
              : "DETALHES DO RESGATE DE CRIPTOMOEDA"}
          </Heading>
        </View>

        <View style={{ gap: spacing[16] }}>
          <View style={{ gap: spacing[8] }}>
            <Label size="sm-regular" style={{ color: base.grey[40] }}>
              {transactionType === "invest"
                ? "Valor do investimento"
                : "Valor do resgate"}
            </Label>

            <View style={styles.flexRow}>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.image}
                  source={tokenIn.image}
                  contentFit="cover"
                />
              </View>

              <View style={styles.currencyContainer}>
                <Heading size="heading2">
                  {BigNumber(quote.srcAmount)
                    .div(BigNumber(10).pow(quote.srcDecimals))
                    .toNumber()
                    .toLocaleString("en-US", {
                      ...SIMPLE_CURRENCY_FORMAT,
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 18
                    })}
                </Heading>

                <Heading size="heading5">{tokenIn.symbol}</Heading>
              </View>
            </View>

            <Label size="sm-regular" style={{ color: base.grey[40] }}>
              Quantidade a ser recebida
            </Label>

            <View style={styles.flexRow}>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.image}
                  source={tokenOut.image}
                  contentFit="cover"
                />
              </View>

              <View style={styles.currencyContainer}>
                <Heading size="heading2">
                  {BigNumber(quote.destAmount)
                    .div(BigNumber(10).pow(quote.destDecimals))
                    .toNumber()
                    .toLocaleString("en-US", {
                      ...SIMPLE_CURRENCY_FORMAT,
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 18
                    })}
                </Heading>

                <Heading size="heading5">{tokenOut.symbol}</Heading>
              </View>
            </View>
          </View>

          <Divider />

          <View style={styles.flexContainer}>
            <Label size="sm-regular" style={styles.labelSmall}>
              Resgate
            </Label>

            <Label>Disponibilidade Diária</Label>
          </View>

          <View style={styles.flexContainer}>
            <Label size="sm-regular" style={styles.labelSmall}>
              Variação (24 horas)
            </Label>

            <Label
              style={{
                color: BigNumber(tokenIn?.change ?? tokenOut?.change ?? 0).gte(
                  0
                )
                  ? dark.fg.success
                  : dark.fg.error
              }}
            >
              {BigNumber(tokenIn?.change ?? tokenOut?.change ?? 0).gt(0)
                ? "+"
                : ""}
              {(tokenIn?.change ?? tokenOut?.change ?? 0).toLocaleString(
                "en-US",
                {
                  maximumFractionDigits: 2
                }
              )}
              %
            </Label>
          </View>

          <View style={styles.flexContainer}>
            <Label size="sm-regular" style={styles.labelSmall}>
              Taxa de operação
            </Label>

            <Label>R$ 0,10</Label>
          </View>
        </View>

        <View style={{ marginTop: "auto", marginBottom: spacing[16] }}>
          <Button
            text={
              transactionType === "invest"
                ? "Confirmar investimento"
                : "Confirmar resgate"
            }
            onPress={handleConfirm}
          />
        </View>
      </Container>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: spacing[24]
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[8]
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing[4]
  },
  imageWrapper: {
    borderRadius: borderRadius.pill,
    overflow: "hidden"
  },
  tokenImage: {
    width: 24,
    aspectRatio: 1
  },
  image: {
    width: 24,
    aspectRatio: 1
  },
  flexContainer: {
    gap: spacing[8]
  },
  labelSmall: {
    color: base.grey[40]
  }
});
