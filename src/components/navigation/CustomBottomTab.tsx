import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";

import BottomTabIcon from "@/components/navigation/BottomTabIcon";
import Label from "@/components/typography/Label";
import { borderRadius, dark, spacing } from "@/constants/DesignTokens";

const TAB_WIDTH = 101.33;
const TAB_BAR_WIDTH = 328;
const PADDING = spacing[8];
const GAP = spacing[4];

export default function CustomBottomTab({
  state,
  descriptors,
  navigation
}: BottomTabBarProps) {
  const translateAnimaiton = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(TAB_WIDTH * state.index + 2 * state.index)
        }
      ]
    };
  });

  return (
    <View style={[styles.tabBarContainer, { width: TAB_BAR_WIDTH }]}>
      <Animated.View
        style={[
          styles.slidingTabContainer,
          { width: TAB_WIDTH + PADDING * 2 },
          translateAnimaiton
        ]}
      >
        <View style={styles.slidingTab} />
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

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
            style={{ flex: 1 }}
          >
            <View style={styles.contentContainer}>
              <BottomTabIcon route={route.name} isFocused={isFocused} />

              <Label
                size="sm-bold"
                style={{
                  color: isFocused ? dark.fg["on-contrast"] : dark.fg.subtle
                }}
              >
                {options.title}
              </Label>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flex: 1,
    flexDirection: "row",
    height: 74,
    position: "absolute",
    bottom: 16,
    backgroundColor: dark.fg.base,
    borderRadius: borderRadius.medium,
    padding: PADDING,
    gap: GAP,
    alignSelf: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[8]
  },
  slidingTabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  },
  slidingTab: {
    width: TAB_WIDTH,
    height: 58,
    backgroundColor: dark.fg.link,
    borderRadius: 4
  }
});
