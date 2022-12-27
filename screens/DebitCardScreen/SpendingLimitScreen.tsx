import { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { MonoText } from "../../components/StyledText";
import BalancePrefix from "./components/BalancePrefix";
import LimitSmall from "../../assets/images/limit-small.svg";

import { IDebitCardPayload } from "./types";
import colors from "../../constants/Colors";

import { setSpendingLimitThunk } from "./thunks";

import { formatThounsand } from "../../utils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const suggestCardWidth = SCREEN_WIDTH / 3.7;

const suggestCards = [5000, 10000, 20000];

export default function SpendingLimitScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const { debitCard } = useAppSelector((state) => state.debit);

  const [spendingLimit, setSpendingLimit] = useState(0);
  const [spendingLimitLabel, setSpendingLimitLabel] = useState("");

  useLayoutEffect(() => {
    const { spendingLimit } = debitCard;
    const formatted = formatThounsand(spendingLimit);

    setSpendingLimit(spendingLimit);
    setSpendingLimitLabel(+formatted === 0 ? "" : formatted);
  }, []);

  const spendingLimitOnChange = (value: string) => {
    const number = +value.replace(/[,]+/g, "");
    if (number > 999999999999999 || isNaN(number)) return;
    const formatted = formatThounsand(number);

    setSpendingLimit(number);
    setSpendingLimitLabel(+formatted === 0 ? "" : formatted);
  };

  const suggestCardOnPress = (value: string) => {
    spendingLimitOnChange(value);
  };

  const handleSubmit = () => {
    const payload: IDebitCardPayload = {
      ...debitCard,
      isSetSpendingLimit: true,
      spendingLimit,
    };
    dispatch(setSpendingLimitThunk(payload));
    navigation.navigate("Debit");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: colors["white-1"],
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            marginTop: 8,
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
                autoFocus={true}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  height: 40,
                  fontSize: 24,
                  fontWeight: "bold",
                }}
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
                const formatted = formatThounsand(amount);
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
          <Pressable
            style={styles.saveBtn}
            onPress={handleSubmit}
            disabled={!spendingLimit}
          >
            <MonoText style={styles.saveBtnLabel}>Save</MonoText>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
