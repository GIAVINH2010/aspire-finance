import { StyleSheet, View } from "react-native";

import colors from "../../constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import CardBalance from "./components/CardBalance";
import CardUltilities from "./components/CardUltilities";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { fetchDebitCardThunk } from "./thunks";
import { setViewHeight } from "../../store/appReducer";

export default function DebitCardScreen() {
  const dispatch = useAppDispatch();

  const { viewHeight } = useAppSelector((state) => state.app.screen);

  useEffect(() => {
    dispatch(fetchDebitCardThunk());
  }, []);

  // @ts-ignore
  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    if (!viewHeight) {
      dispatch(setViewHeight(height));
    }
  };

  const { debitCard } = useAppSelector((state) => state.debit);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container} onLayout={handleLayout}>
        <CardBalance balance={debitCard.balance} />
        <CardUltilities debitCard={debitCard} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["blue-1"],
  },
});
