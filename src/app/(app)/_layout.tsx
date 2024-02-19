import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_700Bold
} from "@expo-google-fonts/plus-jakarta-sans";
import { Redirect, Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";

import { useSession } from "@/context/auth";

export default function AppLayout() {
  const { userInfo, isLoading } = useSession();
  const [loaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_700Bold
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      // SplashScreen.hideAsync();
    }
  }, [loaded]);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return null;
  }

  if (!loaded) {
    return null;
  }

  SplashScreen.hideAsync();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!userInfo) {
    //   // On web, static rendering will stop here as the user is not authenticated
    //   // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modals)" />
      <Stack.Screen
        name="settings"
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack>
  );
}
