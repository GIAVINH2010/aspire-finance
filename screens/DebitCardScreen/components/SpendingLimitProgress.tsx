import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

import { MonoText } from "../../../components/StyledText";
import colors from "../../../constants/Colors";
import { formatCurrency } from "../../../utils";

const money = 5000;

export default function SpendingLimitProgress() {
  return (
    <View style={styles.spendingLimitProgress}>
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <MonoText style={styles.label}>Debit card spending limit</MonoText>
        <View style={{ flexDirection: "row" }}>
          <MonoText style={styles.spent}>{formatCurrency(money)}</MonoText>
          <MonoText style={styles.divider}>|</MonoText>
          <MonoText style={styles.spendingLimit}>
            {formatCurrency(money)}
          </MonoText>
        </View>
      </View>
      <Progress.Bar
        progress={0.3}
        color={colors.green}
        unfilledColor="rgba(1, 209, 103, 0.1)"
        borderWidth={0}
        width={null}
        height={15}
        borderRadius={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spendingLimitProgress: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  label: {
    flex: 1,
    fontSize: 13,
    fontWeight: "400",
  },
  divider: {
    paddingHorizontal: 5,
    color: colors["gray-4"],
  },
  spent: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.green,
  },
  spendingLimit: {
    fontSize: 13,
    fontWeight: "400",
    color: "#22222233",
  },
});
