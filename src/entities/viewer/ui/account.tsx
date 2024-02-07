import { Block, BlockFooter } from "framework7-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { BitcoinIcon } from "shared/ui/icons";
import { CryptocurrencyStore } from "../model/store";
import { useGetPeakBitcoinValue } from "../hooks/useGetPeakBitcoinValue";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export const ViewerAccount = observer(({ className }: Props) => {
  const [bitcoinValue, maxMoney] = useGetPeakBitcoinValue();

  useEffect(() => {
    CryptocurrencyStore.getNumberOfBitcoinsTheViewerHas(13);

    setInterval(() => {
      CryptocurrencyStore.getBitcoinPrice();
    }, 1000);
  }, []);

  return (
    <Block
      className={twMerge(
        className,
        "my-card",
        "m-4 p-2 border-green-600 border-2 rounded-2xl"
      )}
    >
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
