import { Stack, router } from "expo-router";

import BackNavigation from "@/components/navigation/BackNavigation";
import DepositMethod, { SelectMethodEvent } from "@/screens/DepositMethod";

export default function Deposit() {
  async function handleSelectMethod({ type }: SelectMethodEvent) {
    router.push(`/deposit/${type}` as `http${string}`);
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Balance deposit",
          headerLeft: () => <BackNavigation />
        }}
      />

      <DepositMethod onSelectMethod={handleSelectMethod} />
    </>
  );
}
