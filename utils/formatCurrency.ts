export const formatCurrency = (
  amount: number,
  isDisplayCurrency: boolean = true
) => {
  return amount.toLocaleString("en-US", {
    style: isDisplayCurrency ? "currency" : "decimal",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
