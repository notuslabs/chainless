import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet } from "react-native";

import Heading from "@/components/typography/Heading";
import { dark, base } from "@/constants/DesignTokens";

export default function CustomTopTabBar({
  state,
  descriptors,
  navigation
}: MaterialTopTabBarProps) {
  return (
    <LinearGradient
      colors={[base.brand[60], dark.bg.canvas]}
      locations={[0.5, 0.5]}
      style={styles.container}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tab,
              isFocused && {
                backgroundColor: dark.bg.canvas
              },
              isFocused && index === 0 && { borderTopRightRadius: 8 },
              !isFocused && index === 0 && { borderBottomRightRadius: 8 },
              isFocused &&
                index === 1 && {
                  borderTopLeftRadius: 8
                },
              !isFocused &&
                index === 1 && {
                  borderBottomLeftRadius: 8
                }
            ]}
          >
            <Heading
              size="heading6"
              style={[
                styles.text,
                isFocused && {
                  color: dark.fg.base
                }
              ]}
            >
              {label}
            </Heading>
          </Pressable>
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 36,
    marginTop: 1
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: base.brand[60]
  },
  text: {
    textAlign: "center",
    color: base.grey[90]
  }
});
