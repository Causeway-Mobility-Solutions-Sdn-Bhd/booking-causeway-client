import { useAppSelector } from "@/store/hooks";

export function useFormatPrice() {
  const currency = useAppSelector((state) => state.reservation.currency);
  const allCurrencies = useAppSelector(
    (state) => state.reservation.allCurrencies
  );
  console.log(currency)
  return (price) => {
    const rate =
      allCurrencies?.find((cur) => cur?.code === currency)
        ?.exchange_rate || 1;
        console.log(rate)
    const amount = rate * price?.usd_amount;

    return `${currency?.toUpperCase()} ${amount.toFixed(0)}`;
  };
}
