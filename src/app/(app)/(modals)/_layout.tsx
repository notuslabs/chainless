import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { HEADER_CONFIG } from "@/constants/configurations";

export default function Layout() {
  return (
    <>
      <Stack screenOptions={HEADER_CONFIG} />

      <StatusBar style="dark" />
    </>
  );
}
