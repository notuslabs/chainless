import { ActivityIndicator, StyleSheet } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";

import Label from "@/components/typography/Label";
import { accent, spacing } from "@/constants/DesignTokens";
import useCountdown from "@/hooks/useCountdown";

export default function Loading() {
  const { timeUnits } = useCountdown({ expiresInMS: 60000 });

  return (
    <Animated.View style={styles.container} exiting={FadeOut.duration(400)}>
      <Label size="md-bold">Processando transação...</Label>
      <Label size="md-bold">
        {timeUnits.minutes}:{timeUnits.seconds}
      </Label>

      <ActivityIndicator size="large" color={accent.moderate} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[8]
  }
});
