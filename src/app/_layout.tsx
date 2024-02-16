import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { SplashScreen, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";

import { base, dark } from "@/constants/DesignTokens";

SystemUI.setBackgroundColorAsync(dark.bg.canvas);
SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: dark.fg["on-contrast"],
    background: base.brand[60],
    card: base.brand[60]
  }
};

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <BottomSheetModalProvider>
        <Slot />

        <StatusBar style="dark" />
      </BottomSheetModalProvider>
    </ThemeProvider>
  );
}
