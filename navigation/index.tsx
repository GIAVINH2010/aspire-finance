/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
// import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";
import * as React from "react";

import {
  BottomTabParamList,
  RootBottomTabScreenProps,
  DebitStackParamList,
} from "../types";

import DebitCardScreen from "../screens/DebitCardScreen";
import HomeScreen from "../screens/HomeScreen";
import SpendingLimitScreen from "../screens/DebitCardScreen/SpendingLimitScreen";

import Header from "../components/Header";

import colors from "../constants/Colors";

import HomeIcon from "../assets/images/aspire-logo/logo.svg";
import CardIcon from "../assets/images/card/card.svg";
import AccountIcon from "../assets/images/account.svg";
import CreditIcon from "../assets/images/credit.svg";
import PaymentIcon from "../assets/images/payments.svg";

export default function Navigation() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const DebitStack = createNativeStackNavigator<DebitStackParamList>();

function DebitStackNavigator({
  navigation,
  route,
}: RootBottomTabScreenProps<"DebitTab">) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "SpendingLimit") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <DebitStack.Navigator
      screenOptions={() => ({
        header: ({ route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return <Header title={title}></Header>;
        },
        animation: "fade",
      })}
    >
      <DebitStack.Screen
        name="Debit"
        component={DebitCardScreen}
        options={{ title: "Debit Card" }}
      />
      <DebitStack.Screen
        name="SpendingLimit"
        component={SpendingLimitScreen}
        options={{ title: "Spending limit" }}
      />
    </DebitStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="DebitTab"
      screenOptions={() => ({
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors["gray-3"],
        tabBarLabelStyle: {
          fontFamily: "avenir-demi-bold",
        },
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return <Header title={title}></Header>;
        },
      })}
    >
      <BottomTab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return <HomeIcon fill={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name="DebitTab"
        component={DebitStackNavigator}
        // options={({ navigation }: RootTabScreenProps<"DebitCard">) => ({
        options={() => ({
          title: "Debit Card",
          tabBarIcon: ({ color, focused }) => {
            return <CardIcon fill={color} />;
          },
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="PaymentsTab"
        component={HomeScreen}
        options={{
          title: "Payment",
          tabBarIcon: ({ color }) => {
            return <PaymentIcon fill={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name="CreditTab"
        component={HomeScreen}
        options={{
          title: "Credit",
          tabBarIcon: ({ color }) => {
            return <CreditIcon fill={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={HomeScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => {
            return <AccountIcon fill={color} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
