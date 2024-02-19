import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

import Chevron from "@/components/Chevron";

import Divider from "@/components/divider/Divider";
import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import { borderRadius, dark, base, spacing } from "@/constants/DesignTokens";
import { CURRENCY_FORMAT } from "@/constants/configurations";
import { formatCurrency } from "@/utils/numerals";

// const grossIncomeValue = 300;
// const yeild = 300;
// const taxa = -67;

type AssetAccordionProps = {
  value: number;
};

export default function AssetAccordion({ value }: AssetAccordionProps) {
  // const listRef = useAnimatedRef<Animated.View>();

  // const heightValue = useSharedValue(0);
  // const open = useSharedValue(false);

  // const progress = useDerivedValue(() =>
  //   open.value ? withTiming(1) : withTiming(0)
  // );

  // const heightAnimationStyle = useAnimatedStyle(() => ({
  //   height: heightValue.value
  // }));

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.header}
        // onPress={() => {
        //   if (heightValue.value === 0) {
        //     runOnUI(() => {
        //       "worklet";
        //       heightValue.value = withTiming(measure(listRef)!.height);
        //     })();
        //   } else {
        //     heightValue.value = withTiming(0);
        //   }

        //   open.value = !open.value;
        // }}
      >
        <View style={{ gap: spacing[4] }}>
          <Heading size="heading5">Accumulated value</Heading>

          <Heading size="heading2">{formatCurrency(value, 6)}</Heading>

          {/* <Chevron progress={progress} /> */}
        </View>

        {/* <View style={styles.grossIncome}>
          <Label size="sm-regular" style={styles.title}>
            Rendimento bruto
          </Label>

          <Label
            style={{
              color: grossIncomeValue > 0 ? dark.fg.success : dark.fg.error
            }}
            size="xs-bold"
          >
            {grossIncomeValue > 0 ? "+" : ""}
            {grossIncomeValue.toLocaleString("pt-BR", CURRENCY_FORMAT)}
          </Label>
        </View> */}
      </Pressable>

      {/* <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.body}>
          <Divider />

          <View style={styles.contentContainer}>
            <View style={styles.values}>
              <Label size="xs-regular" style={styles.title}>
                Valor líq. para resgate
              </Label>

              <Label size="xs-bold">
                {(4923).toLocaleString("pt-BR", CURRENCY_FORMAT)}
              </Label>
            </View>

            <View style={styles.values}>
              <Label size="xs-regular" style={styles.title}>
                Total investido
              </Label>

              <Label size="xs-bold">
                {(4700).toLocaleString("pt-BR", CURRENCY_FORMAT)}
              </Label>
            </View>

            <View style={styles.values}>
              <Label size="xs-regular" style={styles.title}>
                Rendimento
              </Label>

              <Label
                size="xs-bold"
                style={{
                  color: yeild > 0 ? dark.fg.success : dark.fg.error
                }}
              >
                {yeild > 0 ? "+" : ""}
                {yeild.toLocaleString("pt-BR", CURRENCY_FORMAT)}
              </Label>
            </View>

            <View style={styles.values}>
              <Label size="xs-regular" style={styles.title}>
                Taxa sobre rendimento
              </Label>

              <Label
                size="xs-bold"
                style={{
                  color: taxa > 0 ? dark.fg.success : dark.fg.error
                }}
              >
                {taxa > 0 ? "+" : ""}
                {taxa.toLocaleString("pt-BR", CURRENCY_FORMAT)}
              </Label>
            </View>
          </View>
        </Animated.View>
      </Animated.View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: base.grey[90],
    borderRadius: borderRadius.medium,
    overflow: "hidden"
  },
  header: {
    gap: spacing[8],
    padding: 16
  },
  grossIncome: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  body: {
    position: "absolute",
    width: "100%",
    top: 0
  },
  contentContainer: {
    padding: 16,
    gap: spacing[16]
  },
  title: { color: base.grey[40] },
  values: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
