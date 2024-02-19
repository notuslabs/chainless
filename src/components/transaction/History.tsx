import { View, StyleSheet } from "react-native";

import Transaction from "@/components/transaction/Transaction";
import Heading from "@/components/typography/Heading";
import { spacing } from "@/constants/DesignTokens";
import useGetHistory from "@/hooks/useGetHistory";

export default function History() {
  const { data } = useGetHistory();

  return (
    <View style={style.container}>
      <Heading size="heading5">TRANSACTION HISTORY</Heading>

      {data
        ? data.transactions.slice(0, 10).map((item, i) => (
            <Transaction
              key={`${item.transactionId}${i}`}
              asset={item.asset}
              type={item.type}
              amount={item.amount}
              timestamp={
                item.timestamp?.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
                }) ?? ""
              }
            />
          ))
        : null}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginHorizontal: spacing[16],
    gap: spacing[24]
  }
});
