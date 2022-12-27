import numbro from "numbro";

export const formatThounsand = (amount: number) => {
  return numbro(amount).format({ thousandSeparated: true });
};
