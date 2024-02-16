import { useState } from "react";
import { View, StyleSheet } from "react-native";

import Toggle, { ToggleEvent } from "@/components/inputs/Toggle";

type ToggleGroupProps = {
  togglers: { label: string; value: string }[];
  defaultValue?: string;
  onPress: (event: ToggleEvent) => void;
};

export default function ToggleGroup({
  togglers,
  defaultValue = "",
  onPress
}: ToggleGroupProps) {
  const [activeId, setActiveId] = useState(defaultValue);

  return (
    <View
      style={styles.container}
      testID="toggleGroup"
      pointerEvents="box-none"
    >
      {togglers?.map((toggle) => (
        <Toggle
          key={toggle.value}
          label={toggle.label}
          value={toggle.value}
          isActive={toggle.value === activeId}
          onPress={(event) => {
            setActiveId(event.value);
            onPress(event);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
