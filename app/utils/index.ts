
export function moneyFormatter(amount) {
  const formatMoney = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
  });

  return formatMoney.format(amount);
}

import { format } from "date-fns";

export const formatDate_util = (date: string, pattern: string) => {
  try {
    if (!date) {
      return;
    }

    return format(new Date(date), pattern);
  } catch (error) {
    console.error(error);
  }
};

