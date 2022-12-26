import { StyleSheet, Text, TextProps } from "react-native";

const AvenirNextFont = {
  normal: "regular",
  bold: "bold",
  "100": "regular",
  "200": "regular",
  "300": "regular",
  "400": "medium",
  "500": "medium",
  "600": "demi-bold",
  "700": "demi-bold",
  "800": "bold",
  "900": "bold",
};

export function MonoText(props: TextProps) {
  const { fontWeight = "400" } = StyleSheet.flatten(props.style || {});
  const fontFamily = `avenir-${AvenirNextFont[fontWeight]}`;

  return <Text {...props} style={[props.style, { fontFamily }]} />;
}
