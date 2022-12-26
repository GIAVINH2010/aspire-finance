import { StyleSheet, Text, View } from "react-native";
import colors from "../../../constants/Colors";

export default function BalancePrefix() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>S$</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: colors.green,
    paddingHorizontal: 12,
    paddingVertical: 3,
    width: 40,
    height: 24,
    marginRight: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors["white-1"],
  },
});
