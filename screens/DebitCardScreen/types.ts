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

export interface IDebitState {
  debitCard: IDebitCard;
}

export type CardBalanceProps = Pick<IDebitCard, "balance">;

export interface IDebitCardUltilitiesProps
  extends Pick<IDebitState, "debitCard"> {}

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

export interface IDebitCardPayload extends IDebitCard {}
