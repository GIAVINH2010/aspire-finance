/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DebitStackParamList {}
  }
}

export type DebitStackParamList = {
  Debit: undefined;
  SpendingLimit: undefined;
};

export type DebitStackScreenProps<Screen extends keyof DebitStackParamList> =
  NativeStackScreenProps<DebitStackParamList, Screen>;

export type BottomTabParamList = {
  HomeTab: undefined;
  DebitTab: undefined;
  PaymentsTab: undefined;
  CreditTab: undefined;
  ProfileTab: undefined;
};

export type RootBottomTabScreenProps<Screen extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, Screen>,
    NativeStackScreenProps<DebitStackParamList>
  >;
