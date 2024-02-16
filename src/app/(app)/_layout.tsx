import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_700Bold
} from "@expo-google-fonts/plus-jakarta-sans";
import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";

export default function AppLayout() {
  const [loaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_700Bold
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  SplashScreen.hideAsync();

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    ></Stack>
  );
}
