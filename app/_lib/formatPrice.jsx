import { useAppSelector } from "@/store/hooks";

export function useFormatPrice() {
  const currency = useAppSelector((state) => state.reservation.currency);
  return (price = "MYR") => {
    if (!price) return `${currency} 0.00`;

    let amount = 0;
    let icon = "RM";

    if (currency === "USD") {
      amount = parseFloat(price.usd_amount || "0");
      icon = "USD";
    } else {
      amount = parseFloat(price.amount || "0");
      icon = "RM";
    }

    return `${icon} ${amount.toFixed(2)}`;
  };
}
