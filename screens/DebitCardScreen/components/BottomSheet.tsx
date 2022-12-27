import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import colors from "../../../constants/Colors";
import { useAppSelector } from "../../../store/hooks";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type Props = {
  children: JSX.Element;
};

export default function BottomSheet({ children }: Props) {
  const { viewHeight } = useAppSelector((state) => state.app.screen);
  const { isSetSpendingLimit } = useAppSelector(
    (state) => state.debit.debitCard
  );

  const MAX_TRANSLATE_Y =
    Math.abs(660 - (viewHeight - 180)) + (isSetSpendingLimit ? 30 : -30);
  const translationY = useSharedValue(0);

  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translationY.value };
    })
    .onUpdate((event) => {
      if (event.translationY < 0) {
        translationY.value = event.translationY + context.value.y;
        translationY.value = Math.max(translationY.value, -MAX_TRANSLATE_Y);
      } else {
        translationY.value = event.translationY + context.value.y;
        translationY.value = Math.min(translationY.value, 0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translationY.value,
      },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors["white-1"],
    position: "absolute",
    top: 180,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: SCREEN_HEIGHT,
  },
});
