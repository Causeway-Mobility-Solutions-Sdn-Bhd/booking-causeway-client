import { useAppSelector } from "@/store/hooks";

export function useFormatPrice() {
  const currency = useAppSelector((state) => state.reservation.currency);
  const allCurrencies = useAppSelector(
    (state) => state.reservation.allCurrencies
  );
  return (price) => {
    const rate =
      allCurrencies?.find((cur) => cur?.code === currency)
        ?.exchange_rate || 1;
    const amount = rate * price?.usd_amount;
    if(currency === "myr"){
      return `RM ${price?.amount}`;
    }

    return `${currency?.toUpperCase()} ${amount.toFixed(2)}`;
  };
}
