import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { VictoryPie } from "victory-native";

import { accent, base } from "@/constants/DesignTokens";

const widthDevice = Dimensions.get("screen").width;

type ChartProps = {
  data: { x: string; y: number }[];
};

export default function Chart({ data }: ChartProps) {
  return (
    <View style={styles.container}>
      <VictoryPie
        width={widthDevice}
        data={data}
        colorScale={
          data[0].x === ""
            ? [base.grey[40]]
            : [base.blue[60], accent.moderate, base.yellow[20], base.blue[30]]
        }
        innerRadius={widthDevice * 0.28}
        style={{
          labels: {
            display: "none"
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: widthDevice - 90,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#000"
  },
  income: {
    position: "absolute"
  }
});
