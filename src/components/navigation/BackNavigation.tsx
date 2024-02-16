import ArrowLeftIcon from "@assets/icons/arrow-left.svg";
import { router } from "expo-router";
import { Pressable } from "react-native";

import { dark, base } from "@/constants/DesignTokens";

type BackNavigationProps = {
  style?: "dark" | "light";
  onPress?: () => void;
};

export default function BackNavigation({
  style = "light",
  onPress
}: BackNavigationProps) {
  return (
    <Pressable
      style={{ width: 32, height: 32, marginTop: 4, marginRight: 7 }}
      onPress={() => (!onPress ? router.back() : onPress())}
    >
      <ArrowLeftIcon
        stroke={style === "light" ? base.grey[90] : dark.fg.base}
        width={32}
        height={32}
      />
    </Pressable>
  );
}
