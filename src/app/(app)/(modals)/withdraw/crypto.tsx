import { Stack, router } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

import BackNavigation from "@/components/navigation/BackNavigation";
import AmountInput from "@/screens/AmountInput";
import SelectCurrency, { SelectCurrencyEvent } from "@/screens/SelectCurrency";
import WithdrawAddress from "@/screens/balanceWithdrawal/WithdrawAddress";

export default function Crypto() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [currency, setCurrency] = useState({
    symbol: "",
    balance: "",
    balanceFiat: "",
    image: ""
  });
  const [amount, setAmount] = useState("");

  const pagerRef = useRef<PagerView>(null);

  const nextPage = () => {
    pagerRef.current?.setPage(currentScreen + 1);
  };

  const previousPage = () => {
    if (currentScreen > 0) {
      pagerRef.current?.setPage(currentScreen - 1);
      return;
    }

    router.back();
  };

  function handleSelectCurrency({
    symbol,
    balance,
    balanceFiat,
    image
  }: SelectCurrencyEvent) {
    setCurrency({
      balance,
      balanceFiat: balanceFiat.toString(),
      image,
      symbol
    });

    nextPage();
  }

  function handleNext(amount: string) {
    setAmount(amount);

    nextPage();
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Crypto Withdrawal",
          headerLeft: () => <BackNavigation onPress={previousPage} />
        }}
      />

      <PagerView
        style={styles.viewPager}
        initialPage={0}
        ref={pagerRef}
        scrollEnabled={false}
        onPageSelected={(e) => setCurrentScreen(e.nativeEvent.position)}
      >
        <SelectCurrency
          key="1"
          title="SELECT CURRENCY TO WITHDRAW"
          onSelectCurrency={handleSelectCurrency}
        />

        <AmountInput
          key="2"
          title="WITHDRAWAL SETTING"
          subTitle="Enter the amount you wish to deposit"
          disabledText="Enter a withdrawal amount"
          onNext={handleNext}
          symbol={currency.symbol}
          balance={currency.balance}
          balanceFiat={currency.balanceFiat}
          image={currency.image}
        />

        <WithdrawAddress
          key="3"
          amount={amount}
          image={currency.image}
          symbol={currency.symbol}
        />
      </PagerView>
    </>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1
  }
});
