import EyeHide from "@assets/icons/eye-hide.svg";
import EyeShow from "@assets/icons/eye-show.svg";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { Tabs, router } from "expo-router";
import { useAtom } from "jotai";
import { View, Pressable, StyleSheet } from "react-native";

import CustomBottomTab from "@/components/navigation/CustomBottomTab";
import { borderRadius, spacing } from "@/constants/DesignTokens";
import { BLURHASH, HEADER_CONFIG } from "@/constants/configurations";
import { useSession } from "@/context/auth";
import { hideValuesAtom } from "@/lib/atoms";

const customBottomTab = (props: BottomTabBarProps) => {
  return <CustomBottomTab {...props} />;
};

export default function TabLayout() {
  const { userInfo } = useSession();
  const [isHidden, setIsHidden] = useAtom(hideValuesAtom);

  return (
    <Tabs
      tabBar={customBottomTab}
      screenOptions={{
        ...HEADER_CONFIG,
        headerTitle: `Olá, ${userInfo?.name ?? userInfo?.email}`,
        headerStyle: {
          height: 100
        },
        headerLeft: () => (
          <Pressable
            style={styles.imageWrapper}
            onPress={() => router.push("/settings/")}
          >
            <Image
              style={styles.image}
              source={userInfo?.avatar}
              placeholder={BLURHASH}
              contentFit="cover"
            />
          </Pressable>
        ),
        headerRight: () => (
          <View style={styles.headerRight}>
            <Pressable onPress={() => setIsHidden(!isHidden)}>
              {isHidden ? <EyeShow /> : <EyeHide />}
            </Pressable>
          </View>
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard"
        }}
      />
      <Tabs.Screen
        name="(investments)"
        options={{
          title: "Investimento"
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Pagamento"
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    marginLeft: 16,
    borderRadius: borderRadius.pill,
    overflow: "hidden"
  },
  image: {
    width: 32,
    height: 32
  },
  headerRight: {
    flexDirection: "row",
    gap: spacing[8],
    marginRight: 16,
    marginTop: 4
  }
});
