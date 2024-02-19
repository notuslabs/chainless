import { Stack, router, useNavigation } from "expo-router";
import { useEffect } from "react";

import BackNavigation from "@/components/navigation/BackNavigation";
import SelectCryptocurrency from "@/screens/cryptocurrency/SelectCryptocurrency";

export default function Cryptocurrency() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Criptomoedas"
    });
  }, [navigation]);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <BackNavigation onPress={router.back} />
        }}
      />

      <SelectCryptocurrency
        OnSelectCryptocurrency={({ id }) => {
          router.push(`/cryptocurrency/${id}`);
        }}
      />
    </>
  );
}
