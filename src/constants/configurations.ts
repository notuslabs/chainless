import { fonts } from "./DesignTokens";

export const BLURHASH =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const CURRENCY_FORMAT = {
  minimumFractionDigits: 2,
  style: "currency",
  currency: "USD"
};

export const SIMPLE_CURRENCY_FORMAT = {
  minimumFractionDigits: 2,
  currency: "USD"
};

export const NETWORK = "Avalanche";

export const HEADER_CONFIG = {
  headerTitleStyle: {
    fontFamily: fonts.PlusJakartaSans_Bold,
    fontSize: 18
  },
  headerTitleAlign: "left",
  headerShadowVisible: false
} as const;

export const BLOCK_SCAN = "https://snowtrace.io/tx/";
