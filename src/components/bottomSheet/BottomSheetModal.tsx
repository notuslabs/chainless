import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetBackdropProps
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ReactNode, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";

import { dark, borderRadius } from "@/constants/DesignTokens";

type BottomSheetProps = {
  children: ReactNode;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  height?: string | number;
};

export default function BottomSheet({
  children,
  bottomSheetModalRef,
  height = "55%"
}: BottomSheetProps) {
  const snapPoints = useMemo(() => ["25%", height], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={0.7}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.backgroundStyle}
      handleStyle={styles.handleStyle}
      handleIndicatorStyle={styles.handleIndicatorStyle}
    >
      {children}
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: dark.bg.canvas
  },
  handleStyle: {
    height: 21.98,
    borderTopLeftRadius: borderRadius.large,
    borderTopRightRadius: borderRadius.large
  },
  handleIndicatorStyle: {
    width: 43.969,
    height: 4.58,
    backgroundColor: dark.bg.contrast
  }
});
