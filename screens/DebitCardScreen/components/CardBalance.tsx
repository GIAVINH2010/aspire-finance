import { StyleSheet, View } from "react-native";
import { MonoText } from "../../../components/StyledText";
import colors from "../../../constants/Colors";
import { formatCurrency } from "../../../utils";
import BalancePrefix from "./BalancePrefix";

const money = 3000;

export default function CardBalance() {
  return (
    <View style={styles.container}>
      <MonoText style={styles.balanceTitle}>Available balance</MonoText>
      <View style={styles.balance}>
        <BalancePrefix />
        <MonoText style={styles.balanceVal}>
          {formatCurrency(money, false)}
        </MonoText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  balanceTitle: {
    color: colors["white-1"],
    paddingBottom: 10,
  },
  balance: {
    flexDirection: "row",
    alignItems: "center",
  },
  balanceVal: {
    color: colors["white-1"],
    fontSize: 24,
    fontWeight: "bold",
  },
});
