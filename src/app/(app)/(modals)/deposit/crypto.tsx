import CopyIcon from "@assets/icons/copy.svg";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StableCurrency } from "@notuslabs/wallet";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { useState, useCallback, useRef } from "react";
import { Pressable, View, StyleSheet } from "react-native";

import BottomSheet from "@/components/bottomSheet/BottomSheetModal";
import WarningCard from "@/components/card/WarningCard";
import BackNavigation from "@/components/navigation/BackNavigation";
import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import { base, borderRadius, spacing } from "@/constants/DesignTokens";
import { NETWORK } from "@/constants/configurations";
import useGetAddress from "@/hooks/useGetAddress";
import SelectCurrency from "@/screens/SelectCurrency";

export default function Crypto() {
  const [address, setAddress] = useState("");
  const [currency, setCurrency] = useState({
    symbol: "",
    image: ""
  });

  const getAddress = useGetAddress();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(address);
  };

  async function handleGetAddress(currency: StableCurrency) {
    const res = await getAddress({ currency });

    setAddress(res);
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Depósito Cripto",
          headerLeft: () => <BackNavigation />
        }}
      />

      <SelectCurrency
        title="SELECIONE A MOEDA NA QUAL O DEPÓSITO SERÁ REALIZADO"
        onSelectCurrency={({ symbol, image }) => {
          setCurrency({
            symbol,
            image
          });

          handlePresentModalPress();

          handleGetAddress(symbol);
        }}
      />

      <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height={452}>
        <View style={styles.contentContainer}>
          <Heading size="heading5">CONFIGURAÇÃO DE DEPÓSITO</Heading>

          <WarningCard
            text={`Envie somente ${currency.symbol} para este endereço na rede ${NETWORK}`}
          />

          <View style={{ gap: spacing[16] }}>
            <Label
              size="sm-regular"
              style={{
                color: base.grey[40]
              }}
            >
              Moeda selecionada para depósito
            </Label>

            <View style={styles.nameWrapper}>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.image}
                  source={currency.image}
                  contentFit="cover"
                />
              </View>

              <Label style={{ textTransform: "uppercase" }}>
                {currency.symbol}
              </Label>
            </View>
          </View>

          <View style={{ gap: spacing[8] }}>
            <Label
              size="sm-regular"
              style={{
                color: base.grey[40]
              }}
            >
              Rede
            </Label>

            <Label>{NETWORK}</Label>
          </View>

          <View style={{ gap: spacing[12] }}>
            <Label
              size="sm-regular"
              style={{
                color: base.grey[40]
              }}
            >
              Endereço
            </Label>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: spacing[8]
              }}
            >
              <View style={{ flexShrink: 1, gap: spacing[4] }}>
                <Label>{address}</Label>
              </View>

              <Pressable onPress={copyToClipboard}>
                <CopyIcon />
              </Pressable>
            </View>
          </View>
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: spacing[16],
    paddingTop: spacing[16],
    gap: spacing[24]
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing[4]
  },
  imageWrapper: {
    borderRadius: borderRadius.pill,
    overflow: "hidden"
  },
  image: {
    width: 24,
    height: 24
  }
});
