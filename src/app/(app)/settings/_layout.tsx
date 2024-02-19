import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import BackNavigation from "@/components/navigation/BackNavigation";
import { dark } from "@/constants/DesignTokens";
import { HEADER_CONFIG } from "@/constants/configurations";

const CUSTOM_HEADER_CONFIG = {
  ...HEADER_CONFIG,
  headerTitleStyle: {
    ...HEADER_CONFIG.headerTitleStyle,
    color: dark.fg.base
  }
};

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          ...CUSTOM_HEADER_CONFIG,
          title: "Settings",
          headerStyle: {
            backgroundColor: dark.bg.canvas
          },
          headerLeft: () => <BackNavigation style="dark" />
        }}
      />

      <StatusBar style="light" />
    </>
  );
}
