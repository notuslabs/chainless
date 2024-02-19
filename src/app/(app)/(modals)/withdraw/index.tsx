import { Stack, router } from "expo-router";

import BackNavigation from "@/components/navigation/BackNavigation";
import WithdrawMethod, {
  SelectMethodEvent
} from "@/screens/balanceWithdrawal/WithdrawMethod";

export default function Withdraw() {
  async function handleSelectMethod({ type }: SelectMethodEvent) {
    router.push(`/withdraw/${type}` as `http${string}`);
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Retirada de saldo",
          headerLeft: () => <BackNavigation />
        }}
      />

      <WithdrawMethod onSelectMethod={handleSelectMethod} />
    </>
  );
}
