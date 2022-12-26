import { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import colors from "../../../constants/Colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type Props = {
  children: JSX.Element;
};

export default function BottomSheet({ children }: Props) {
  const navigation = useNavigation();
  const [isSpendingLimit, setIsSpendingLimit] = useState(false);
  const translationY = useSharedValue(0);

  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translationY.value };
    })
    .onUpdate((event) => {
      if (event.translationY < 0) {
        translationY.value = event.translationY + context.value.y;
        translationY.value = Math.max(translationY.value, -SCREEN_HEIGHT / 8);
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
