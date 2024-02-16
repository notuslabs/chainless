import { StyleSheet } from "react-native";
import {
  MaterialTabBar,
  MaterialTabItem,
  MaterialTabBarProps
} from "react-native-collapsible-tab-view";
import { TabName } from "react-native-collapsible-tab-view/lib/typescript/src/types";

import { accent, dark, fonts } from "@/constants/DesignTokens";

export default function CustomTabBar(props: MaterialTabBarProps<TabName>) {
  return (
    <MaterialTabBar
      {...props}
      // scrollEnabled
      activeColor={accent.moderate}
      inactiveColor={dark.fg.subtle}
      style={styles.container}
      tabStyle={styles.tabStyle}
      labelStyle={styles.labelStyle}
      indicatorStyle={styles.indicatorStyle}
      TabItemComponent={(tabBarItemProps) => (
        <MaterialTabItem {...tabBarItemProps} android_ripple={undefined} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: dark.bg.canvas,
    marginVertical: 4
  },
  tabStyle: {
    width: 113.5,
    height: 48,
    borderBottomColor: dark.fg.subtle,
    borderBottomWidth: 1
  },
  labelStyle: {
    fontFamily: fonts.PlusJakartaSans_Bold,
    textTransform: "capitalize",
    fontSize: 16,
    lineHeight: 16,
    textAlign: "center",
    width: 113.5
  },
  indicatorStyle: {
    backgroundColor: accent.moderate,
    width: 113.5,
    height: 1
  }
});
