import { StyleSheet, View } from "react-native";
import { MonoText } from "../../../components/StyledText";
import colors from "../../../constants/Colors";
import { formatThounsand } from "../../../utils";
import { CardBalanceProps } from "../types";
import BalancePrefix from "./BalancePrefix";

export default function CardBalance({ balance }: CardBalanceProps) {
  return (
    <View style={styles.container}>
      <MonoText style={styles.balanceTitle}>Available balance</MonoText>
      <View style={styles.balance}>
        <BalancePrefix />
        <MonoText style={styles.balanceVal}>
          {formatThounsand(balance)}
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
