import ChevronDown from "@assets/icons/chevron-down.svg";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle
} from "react-native-reanimated";

type ChevronProps = {
  progress: Readonly<SharedValue<0 | 1>>;
};

const Chevron = ({ progress }: ChevronProps) => {
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * -180}deg` }]
  }));

  return (
    <Animated.View style={[styles.container, iconStyle]}>
      <ChevronDown />
    </Animated.View>
  );
};

export default Chevron;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    width: 24,
    height: 24
  }
});
