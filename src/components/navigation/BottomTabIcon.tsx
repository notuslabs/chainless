import BarChartIcon from "@assets/icons/bar-chart.svg";
import HomeIcon from "@assets/icons/home.svg";
import InvoiceIcon from "@assets/icons/invoice.svg";
import { View } from "react-native";

import { dark } from "@/constants/DesignTokens";

type BottomTabIconProps = {
  route: string;
  isFocused: boolean;
};

export default function BottomTabIcon({
  route,
  isFocused
}: BottomTabIconProps) {
  const renderIcon = (route: string, isFocused: boolean) => {
    switch (route) {
      case "index":
        return (
          <HomeIcon
            stroke={isFocused ? dark.fg["on-contrast"] : dark.fg.subtle}
          />
        );
      case "(investments)":
        return (
          <BarChartIcon
            stroke={isFocused ? dark.fg["on-contrast"] : dark.fg.subtle}
          />
        );
      case "payments":
        return (
          <InvoiceIcon
            stroke={isFocused ? dark.fg["on-contrast"] : dark.fg.subtle}
          />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
}
