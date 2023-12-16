import { Block, BlockFooter } from "framework7-react";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { BitcoinIcon } from "shared/ui/icons";
import { CryptocurrencyStore } from "../model/store";
import { useGetPeakBitcoinValue } from "../hooks/useGetPeakBitcoinValue";

export const ViewerAccount = observer(() => {
  const [bitcoinValue, maxMoney] = useGetPeakBitcoinValue();

  useEffect(() => {
    CryptocurrencyStore.getNumberOfBitcoinsTheViewerHas(13);

    setInterval(() => {
      CryptocurrencyStore.getBitcoinPrice()
    }, 1000)
  }, []);

  return (
    <Block className="m-4 p-2 border-green-600 border-2 rounded-2xl">
      <div className="flex items-center justify-between gap-2">
        <BitcoinIcon width={44} height={44}></BitcoinIcon>
        <div className="flex flex-row  flex-1">
          Количество: {CryptocurrencyStore.numberOfBitcoinsTheViewerHas}{" "}
          Стоимость: {CryptocurrencyStore.bitcoinPrice}
        </div>
        <div className="">
          В рублях: {CryptocurrencyStore.getMoneyTheViewerHas}
        </div>
      </div>

      <BlockFooter>
        Максимальная стоимость биткоина: {bitcoinValue} Максимальная возможная
        выручка: {maxMoney}
      </BlockFooter>
    </Block>
  );
});
