import { useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import colors from "../../../constants/Colors";
import { chunkString } from "../../../utils";
import { MonoText } from "../../../components/StyledText";
import { ICardNumberProps, IDebitCardInfoProps } from "../types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CardNumber = ({ cardNumber, show }: ICardNumberProps) => {
  const chunked = chunkString(cardNumber, 4);
  return (
    <View style={styles.cardNumberContainer}>
      {chunked?.map((group, i) =>
        show || i + 1 === chunked.length ? (
          <MonoText
            key={i}
            style={[{ marginLeft: i !== 0 ? 20 : 0 }, styles.cardNumber]}
          >
            {group}
          </MonoText>
        ) : (
          <View
            key={i}
            style={[{ marginLeft: i !== 0 ? 20 : 0, marginTop: 4 }]}
          >
            <View style={{ flexDirection: "row" }}>
              {group.split("").map((_, k) => (
                <View
                  key={k}
                  style={{
                    backgroundColor: colors["white-1"],
                    borderRadius: 16,
                    width: 8,
                    height: 8,
                    marginLeft: k !== 0 ? 6 : 0,
                  }}
                />
              ))}
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default function DebitCard({ debitCardInfo }: IDebitCardInfoProps) {
  const { cardName, cardNumber, cardThru, cardCVV } = debitCardInfo;
  const [show, setShow] = useState(false);

  const showIcon = show
    ? require("../../../assets/images/hide-eye/hide-eye.png")
    : require("../../../assets/images/show-eye/show-eye.png");

  const handleShowCardNumber = () => {
    setShow(!show);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image
          source={require("../../../assets/images/aspire-logo/aspire-logo.png")}
          style={styles.cardLogo}
        />

        <View style={{ flex: 1 }}>
          <MonoText style={styles.cardOwner}>{cardName}</MonoText>
          <CardNumber cardNumber={cardNumber} show={show} />
          <View style={styles.cardInfoContainer}>
            <View style={styles.cardInfoContainer}>
              <MonoText style={styles.cardInfo}>
                Thru: <MonoText style={styles.cardInfoVal}>{cardThru}</MonoText>
              </MonoText>
            </View>

            <View style={styles.cardInfoContainer}>
              <MonoText style={[styles.cardInfo, { marginLeft: 35 }]}>
                CVV:{" "}
              </MonoText>
              {show ? (
                <MonoText style={styles.cardInfoVal}>{cardCVV}</MonoText>
              ) : (
                <MonoText style={styles.cardHiddenInfo}>***</MonoText>
              )}
            </View>
          </View>
        </View>
        <Image
          style={styles.cardLogo}
          source={require("../../../assets/images/visa/visa-logo.png")}
        />
      </View>
      <Pressable
        style={styles.cardUtilContainer}
        onPress={handleShowCardNumber}
      >
        <Image source={showIcon} />
        <MonoText style={styles.cardUtilText}>
          {show ? "Hide" : "Show"} card number
        </MonoText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 48,
    aspectRatio: 1.6,
    maxWidth: 366,
    maxHeight: 220,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: colors.green,
    padding: 24,
  },
  cardLogo: {
    alignSelf: "flex-end",
  },
  cardOwner: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors["white-1"],
    marginVertical: 24,
    paddingVertical: 5,
    letterSpacing: 0.53,
  },
  cardNumberContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  cardNumber: {
    color: colors["white-1"],
    letterSpacing: 3.46,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 19,
  },
  cardInfoContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  cardInfo: {
    color: colors["white-1"],
    fontWeight: "600",
    fontSize: 13,
  },
  cardInfoVal: {
    fontSize: 13,
    letterSpacing: 1.56,
    fontWeight: "600",
    color: colors["white-1"],
  },
  cardHiddenInfo: {
    fontSize: 24,
    color: colors["white-1"],
    letterSpacing: 2.88,
    position: "absolute",
    right: -42,
    top: -1,
  },
  cardUtilContainer: {
    position: "absolute",
    right: 0,
    top: -30,
    backgroundColor: colors["white-1"],
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    zIndex: -1,
  },
  cardUtilText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.green,
    marginLeft: 6,
  },
});
