import { StyleSheet, View } from "react-native";

import colors from "../../constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import CardBalance from "./components/CardBalance";
import CardUltilities from "./components/CardUltilities";

export default function DebitCardScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <CardBalance />
        <CardUltilities />
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
