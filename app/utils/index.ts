import { format } from "date-fns";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GHS",
  minimumFractionDigits: 2,
});

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
export { moneyFormatter };
