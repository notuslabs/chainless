import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { Platform } from "react-native";

import { base, dark } from "@/constants/DesignTokens";
import { SessionProvider } from "@/context/auth";

SystemUI.setBackgroundColorAsync(dark.bg.canvas);
SplashScreen.preventAutoHideAsync();

if (Platform.OS === "android") {
  NavigationBar.setBackgroundColorAsync(dark.bg.canvas);
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: dark.fg["on-contrast"],
    background: base.brand[60],
    card: base.brand[60]
  }
};

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <BottomSheetModalProvider>
            <Slot />

            <StatusBar style="dark" />
          </BottomSheetModalProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
