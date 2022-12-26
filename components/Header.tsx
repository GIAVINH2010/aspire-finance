import { Image, Pressable, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { MonoText } from "./StyledText";
import { useNavigation } from "@react-navigation/native";

type HeaderType = {
  title: string;
};

export default function Header({ title }: HeaderType) {
  const navigation = useNavigation();

  const { index, type } = navigation.getState();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        {type === "stack" && index !== 0 ? (
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color={Colors["white-1"]} />
          </Pressable>
        ) : (
          <View />
        )}
        <Image source={require("../assets/images/aspire-logo/logo.png")} />
      </View>
      {type === "stack" && index !== 0 ? (
        <MonoText style={[styles.title]}>{title}</MonoText>
      ) : (
        <MonoText style={[styles.floatingTitle]}>{title}</MonoText>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: 24,
    // paddingBottom: 16,
    backgroundColor: Colors["blue-1"],
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors["white-1"],
    paddingVertical: 16,
  },
  floatingTitle: {
    position: "absolute",
    bottom: 8,
    left: 24,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors["white-1"],
  },
});
