import MailIcon from "@assets/icons/Mail.svg";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { StableCurrency } from "@notuslabs/wallet";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useCallback, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, StyleSheet, Keyboard } from "react-native";
import { Address } from "viem";
import { z } from "zod";

import Container from "@/components/Container";
import Loading from "@/components/Loading";
import BottomSheet from "@/components/bottomSheet/BottomSheetModal";
import Button from "@/components/buttons/Button";
import TextField from "@/components/inputs/TextField";
import WithdrawReceipt from "@/components/receipts/WithdrawalReceipt";
import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import Paragraph from "@/components/typography/Paragraph";
import { borderRadius, base, spacing, dark } from "@/constants/DesignTokens";
import { NETWORK } from "@/constants/configurations";
import useWithdrawFiat from "@/hooks/useWithdrawFiat";
import TransactionSuccess from "@/screens/TransactionSuccess";

const ADDRESS = "address";

const addressInputSchema = z.object({
  [ADDRESS]: z
    .string()
    .startsWith("0x", "The address must start with 0x")
    .regex(/0x[0-9a-fA-F]{40}/, "Not a valid address")
    .length(42)
});

type AddressInputSchema = z.infer<typeof addressInputSchema>;

type WithdrawAddressType = {
  symbol: string;
  amount: string;
  image: string;
};

export default function WithdrawAddress({
  symbol,
  amount,
  image
}: WithdrawAddressType) {
  const { sendTransaction, response, isSending, error } = useWithdrawFiat();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(async () => {
    bottomSheetModalRef.current?.present();
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<AddressInputSchema>({
    resolver: zodResolver(addressInputSchema)
  });

  const watchAddress = watch(ADDRESS);

  function handleBack() {
    router.back();
  }

  const onSubmit = (data: AddressInputSchema) => {
    handlePresentModalPress();

    Keyboard.dismiss();

    sendTransaction({
      amount,
      currency: symbol as StableCurrency,
      to: data[ADDRESS] as Address
    });
  };

  return (
    <Container style={styles.container}>
      <Heading size="heading5">WITHDRAWAL SETUP</Heading>

      <Paragraph size="md">Set the crypto shipping address</Paragraph>
      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            placeholder="Enter crypto address"
            icon={<MailIcon />}
            value={value}
            error={errors.address?.message}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
        name={ADDRESS}
      />

      {errors.address ? (
        <Label size="sm-regular" style={{ color: dark.fg.error }}>
          {errors.address.message}
        </Label>
      ) : null}

      <View style={{ gap: spacing[16] }}>
        <Label
          size="sm-regular"
          style={{
            color: base.grey[40]
          }}
        >
          Amount to be withdrawn
        </Label>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing[4]
          }}
        >
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={image} contentFit="cover" />
          </View>

          <Label>
            {amount} {symbol}
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
          Network
        </Label>

        <Label>{NETWORK}</Label>
      </View>

      <View style={{ marginTop: "auto" }}>
        <Button
          text="Confirm withdrawal"
          disabled={watchAddress === undefined}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <BottomSheet bottomSheetModalRef={bottomSheetModalRef} height="90%">
        {isSending ? (
          <Loading />
        ) : (
          <>
            {error ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Label size="md-bold">{error}</Label>
              </View>
            ) : (
              <TransactionSuccess
                title="Withdrawal confirmed"
                buttonLabel="Return to dashboard"
                onBack={handleBack}
              >
                <WithdrawReceipt
                  id={response?.userOpReceipts[0].transactionHash ?? ""}
                  amount={Number(amount)}
                  symbol={symbol}
                  address={watchAddress}
                />
              </TransactionSuccess>
            )}
          </>
        )}
      </BottomSheet>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: spacing[24]
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
