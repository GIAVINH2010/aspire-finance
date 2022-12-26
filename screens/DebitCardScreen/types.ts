interface IDebitCard {
  balance: number;
  info: IDebitCardInfo;
  spentAmount: number;
  spendingLimit: number;
  isSetSpendingLimit: boolean;
}

interface IDebitCardInfo {
  cardName: string;
  cardNumber: string;
  cardThru: string;
  cardCVV: string;
}

export interface IDebitState extends IDebitCard {
  id: number;
}

export type CardBalanceProps = Pick<IDebitState, "balance">;

export interface IDebitCardUltilitiesProps {
  debitCard: IDebitState;
}

export interface IDebitCardInfoProps {
  debitCardInfo: IDebitCardInfo;
}

export interface ICardNumberProps {
  cardNumber: string;
  show: boolean;
}

export interface ISpendingLimitProgressProps {
  spentAmount: number;
  spendingLimit: number;
}
