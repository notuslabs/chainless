import { Dimensions } from "react-native";
import Svg from "react-native-svg";
import { VictoryAxis, VictoryLine, VictoryTheme } from "victory-native";

import { base, dark } from "@/constants/DesignTokens";

const WIDTH = Dimensions.get("screen").width;
const CHART_WIDTH = WIDTH - 32;
const CHART_HEIGHT = CHART_WIDTH * 0.55;

type LineChartProps = {
  data: { x: number; y: number }[] | undefined;
};

export default function LineChart({ data }: LineChartProps) {
  return (
    <Svg width={CHART_WIDTH} height={CHART_HEIGHT + 2} pointerEvents="box-none">
      {data ? (
        <VictoryLine
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          theme={VictoryTheme.material}
          style={{
            data: {
              stroke: () =>
                (data.at(1)?.y ?? 0) > (data.at(-1)?.y ?? 0)
                  ? dark.fg.error
                  : dark.fg.success,
              strokeWidth: 2
            }
          }}
          padding={0}
          data={data}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        />
      ) : null}

      <VictoryAxis
        dependentAxis
        width={CHART_WIDTH}
        height={CHART_HEIGHT}
        tickValues={[0, 1, 2, 3, 4, 5]}
        style={{
          grid: { stroke: base.grey[80], strokeWidth: 1 },
          tickLabels: { fill: "none" },
          axis: { stroke: "none" }
        }}
        padding={0}
        standalone={false}
      />
    </Svg>
  );
}
