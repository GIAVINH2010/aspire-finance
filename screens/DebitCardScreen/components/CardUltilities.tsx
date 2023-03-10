import { Pressable, StyleSheet, View } from "react-native";
import { Switch } from "react-native-switch";
import { useNavigation } from "@react-navigation/native";

import { MonoText } from "../../../components/StyledText";
import colors from "../../../constants/Colors";
import BottomSheet from "./BottomSheet";
import DebitCard from "./DebitCard";
import SpendingLimitProgress from "./SpendingLimitProgress";

import TopupIcon from "../../../assets/images/topup.svg";
import LimitIcon from "../../../assets/images/limit.svg";
import FreezeIcon from "../../../assets/images/freeze.svg";
import NewCardIcon from "../../../assets/images/new-card.svg";
import DeactivateIcon from "../../../assets/images/deactivate.svg";

import { IDebitCardUltilitiesProps } from "../types";
import { unactiveSpendingLimit } from "../reducer";

import { useAppDispatch } from "../../../store/hooks";

import { formatThounsand } from "../../../utils";

export default function CardUltilities({
  debitCard,
}: IDebitCardUltilitiesProps) {
  const {
    info: debitCardInfo,
    isSetSpendingLimit,
    spentAmount,
    spendingLimit,
  } = debitCard;

  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const isSpendingLimitOnChange = (value: boolean) => {
    if (isSetSpendingLimit && !value) {
      dispatch(unactiveSpendingLimit());
    } else {
      navigation.navigate("SpendingLimit");
    }
  };
  return (
    <BottomSheet>
      <>
        <View style={styles.cardContainer}>
          <DebitCard debitCardInfo={debitCardInfo} />
        </View>
        <View style={{ paddingVertical: 32 }}>
          {isSetSpendingLimit ? (
            <SpendingLimitProgress
              spentAmount={spentAmount}
              spendingLimit={spendingLimit}
            />
          ) : (
            <></>
          )}
          <View style={styles.utilContainer}>
            <TopupIcon />
            <View style={styles.utilTitleContainer}>
              <MonoText style={styles.utilName}>Top-up account</MonoText>
              <MonoText style={styles.utilDescription}>
                Deposit money to your account to use with card
              </MonoText>
            </View>
          </View>
          <Pressable onPress={() => navigation.navigate("SpendingLimit")}>
            <View style={styles.utilContainer}>
              <LimitIcon />
              <View style={styles.utilTitleContainer}>
                <MonoText style={styles.utilName}>
                  Weekly spending limit
                </MonoText>
                <MonoText style={styles.utilDescription}>
                  {spendingLimit
                    ? `Your weekly spending limit is S$ ${formatThounsand(
                        spendingLimit
                      )}`
                    : `You haven???t set any spending limit on card`}
                </MonoText>
              </View>
              <View style={styles.switchContainer}>
                <Switch
                  value={isSetSpendingLimit}
                  onValueChange={isSpendingLimitOnChange}
                  renderActiveText={false}
                  renderInActiveText={false}
                  circleSize={16}
                  circleBorderWidth={0}
                  barHeight={20}
                  backgroundActive={colors.green}
                  backgroundInactive={colors["gray-3"]}
                  switchWidthMultiplier={2.1}
                />
              </View>
            </View>
          </Pressable>
          <View style={styles.utilContainer}>
            <FreezeIcon />
            <View style={styles.utilTitleContainer}>
              <MonoText style={styles.utilName}>Freeze card</MonoText>
              <MonoText style={styles.utilDescription}>
                Your debit card is currently active
              </MonoText>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                value={false}
                disabled={true}
                renderActiveText={false}
                renderInActiveText={false}
                circleSize={16}
                circleBorderWidth={0}
                barHeight={20}
                backgroundActive={colors.green}
                backgroundInactive={colors["gray-3"]}
                switchWidthMultiplier={2.1}
              />
            </View>
          </View>
          <View style={styles.utilContainer}>
            <NewCardIcon />
            <View style={styles.utilTitleContainer}>
              <MonoText style={styles.utilName}>Get a new card</MonoText>
              <MonoText style={styles.utilDescription}>
                This deactivates your current debit card
              </MonoText>
            </View>
          </View>
          <View style={styles.utilContainer}>
            <DeactivateIcon />
            <View style={styles.utilTitleContainer}>
              <MonoText style={styles.utilName}>Deactivated cards</MonoText>
              <MonoText style={styles.utilDescription}>
                Your previously deactivated cards
              </MonoText>
            </View>
          </View>
        </View>
      </>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    paddingTop: 3,
  },
  cardContainer: {
    alignSelf: "center",
    marginTop: -60,
  },
  utilContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  utilTitleContainer: {
    paddingHorizontal: 12,
    flex: 1,
  },
  utilName: {
    paddingTop: 4,
    paddingBottom: 2,
  },
  utilDescription: {
    fontSize: 13,
    fontWeight: "100",
    opacity: 0.4,
    lineHeight: 18,
  },
});
