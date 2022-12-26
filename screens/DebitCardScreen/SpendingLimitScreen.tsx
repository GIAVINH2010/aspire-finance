import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../constants/Colors";
import LimitSmall from "../../assets/images/limit-small.svg";
import { MonoText } from "../../components/StyledText";
import BalancePrefix from "./components/BalancePrefix";
import { useState } from "react";
import { formatCurrency } from "../../utils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const suggestCardWidth = SCREEN_WIDTH / 3.7;

const suggestCards = [5000, 10000, 20000];

export default function SpendingLimitScreen() {
  const [spendingLimit, setSpendingLimit] = useState(0);
  const [spendingLimitLabel, setSpendingLimitLabel] = useState("");

  const spendingLimitOnChange = (value: string) => {
    const number = +value.replaceAll(",", "");
    const formatted = formatCurrency(number, false);

    setSpendingLimit(number);
    setSpendingLimitLabel(+formatted === 0 ? "" : formatted);
  };

  const suggestCardOnPress = (value: string) => {
    spendingLimitOnChange(value);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: colors["white-1"],
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          marginTop: 29,
          paddingHorizontal: 24,
          paddingTop: 32,
          paddingBottom: 24,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <LimitSmall />
            <MonoText style={{ marginLeft: 12 }}>
              Set a weekly debit card spending limit
            </MonoText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 0.5,
              borderBottomColor: colors["gray-2"],
              marginBottom: 12,
            }}
          >
            <BalancePrefix />
            <TextInput
              keyboardType="number-pad"
              style={{ flex: 1, height: 40, fontSize: 24, fontWeight: "bold" }}
              onChangeText={spendingLimitOnChange}
              value={spendingLimitLabel}
            />
          </View>
          <MonoText
            style={{ fontSize: 13, color: "#22222266", marginBottom: 32 }}
          >
            Here weekly means the last 7 days - not the calendar week
          </MonoText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {suggestCards.map((amount, i) => {
              const formatted = formatCurrency(amount, false);
              return (
                <Pressable
                  onPress={() => suggestCardOnPress(formatted)}
                  key={i}
                  style={{
                    width: suggestCardWidth,
                    height: 40,
                    backgroundColor: "rgba(32, 209, 103, 0.07)",
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MonoText
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: colors.green,
                    }}
                  >
                    S$ {formatted}
                  </MonoText>
                </Pressable>
              );
            })}
          </View>
        </View>
        <Pressable style={styles.saveBtn}>
          <MonoText style={styles.saveBtnLabel}>Save</MonoText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["blue-1"],
  },
  saveBtn: {
    width: 300,
    height: 56,
    backgroundColor: colors.green,
    alignSelf: "center",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#22222266",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  saveBtnLabel: {
    color: colors["white-1"],
    fontWeight: "600",
    fontSize: 16,
  },
});
