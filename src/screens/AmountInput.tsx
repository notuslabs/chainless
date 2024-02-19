import WalletIcon from "@assets/icons/wallet2.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { z } from "zod";

import Container from "@/components/Container";
import Button from "@/components/buttons/Button";
import SmallButton from "@/components/buttons/SmallButton";
import NumberInput from "@/components/inputs/NumberInput";
import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import { dark, spacing } from "@/constants/DesignTokens";
import { SIMPLE_CURRENCY_FORMAT } from "@/constants/configurations";
import { formatCurrency } from "@/utils/numerals";

const AMOUNT = "amount";

type AmountInputProps = {
  title: string;
  subTitle: string;
  disabledText: string;
  symbol: string;
  balance: string;
  balanceFiat: string;
  image?: string;
  onNext: (amount: string) => void;
};

export default function AmountInput({
  title,
  subTitle,
  disabledText,
  symbol,
  balance,
  balanceFiat,
  image,
  onNext
}: AmountInputProps) {
  const amountInputSchema = z.object({
    [AMOUNT]: z.coerce
      .number()
      .gt(0)
      .max(Number(balance), "Você não tem saldo suficiente")
  });

  type AmountInputSchema = z.infer<typeof amountInputSchema>;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<AmountInputSchema>({
    resolver: zodResolver(amountInputSchema)
  });

  const watchAmount = watch(AMOUNT);

  const onSubmit = (data: AmountInputSchema) => {
    onNext(data.amount.toString());
  };

  return (
    <Container style={styles.container}>
      <Heading size="heading5">{title}</Heading>

      <View style={{ gap: spacing[16] }}>
        <Label size="md-regular">{subTitle}</Label>

        <View style={{ gap: spacing[12] }}>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <NumberInput
                currency={symbol}
                image={image}
                value={value?.toString()}
                error={errors.amount?.message}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
            name={AMOUNT}
          />

          {errors.amount ? (
            <Label size="sm-regular" style={{ color: dark.fg.error }}>
              {errors.amount.message}
            </Label>
          ) : null}

          <View style={{ gap: spacing[8] }}>
            <View style={styles.balanceContainer}>
              <View style={styles.leftWrapper}>
                <WalletIcon width={16} height={16} />

                <Label size="sm-regular">Saldo</Label>
              </View>

              <Label size="sm-regular">
                {formatCurrency(Number(balanceFiat), 6)}
              </Label>
            </View>

            <View style={styles.balanceContainer}>
              <SmallButton
                text="Máx"
                onPress={() => setValue("amount", Number(balance))}
              />

              <Label size="sm-regular" style={{ color: dark.fg.muted }}>
                {Number(balance).toLocaleString("en-US", {
                  ...SIMPLE_CURRENCY_FORMAT,
                  minimumSignificantDigits: 2,
                  maximumSignificantDigits: 6
                })}
              </Label>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginTop: "auto" }}>
        <Button
          text={
            watchAmount === undefined || watchAmount <= 0
              ? disabledText
              : "Próximo"
          }
          disabled={watchAmount === undefined || watchAmount <= 0}
          onPress={handleSubmit(onSubmit)}
        />
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
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  leftWrapper: {
    flexDirection: "row",
    gap: spacing[4],
    alignItems: "center"
  },
  rightWrapper: {
    flexDirection: "row",
    gap: spacing[8],
    alignItems: "center"
  }
});
