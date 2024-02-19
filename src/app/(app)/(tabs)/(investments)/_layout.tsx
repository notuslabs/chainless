import { Tabs } from "expo-router";

import CustomTopTabBar from "@/components/navigation/CustomTopTabBar";
import { MaterialTopTabs } from "@/context/material-top-tabs";

export default function Layout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        swipeEnabled: false
      }}
      tabBar={(props) => <CustomTopTabBar {...props} />}
    >
      <Tabs.Screen name="portfolio" options={{ title: "PORTFOLIO" }} />
      <Tabs.Screen name="products" options={{ title: "PRODUCTS" }} />
    </MaterialTopTabs>
  );
}
