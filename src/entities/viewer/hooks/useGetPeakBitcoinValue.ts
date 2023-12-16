import { useEffect, useState } from "react";
import { CryptocurrencyStore } from "../model/store";

export const useGetPeakBitcoinValue = () => {
  const [value, setValue] = useState<number>(0);
  const [maxMoney, setMaxMoney] = useState<string>("0.00");
  // const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setValue((prev) => {
      if (CryptocurrencyStore.bitcoinPrice > prev) {
        return CryptocurrencyStore.bitcoinPrice;
      }
      return prev;
    });

    if (+CryptocurrencyStore.getMoneyTheViewerHas > +maxMoney) {
      setMaxMoney(CryptocurrencyStore.getMoneyTheViewerHas);
    }
  }, [
    CryptocurrencyStore.bitcoinPrice,
    CryptocurrencyStore.numberOfBitcoinsTheViewerHas,
  ]);

  return [value, maxMoney];
};
