import {
  Block,
  BlockTitle,
  Button,
  Input,
  List,
  ListInput,
} from "framework7-react";
import { ButtonProps } from "framework7-react/components/button";
import { useState } from "react";
import { LoadScreen, toast } from "shared/lib/f7-helpers";
import { bitcoinToString } from "../utils/bitcoin-to-string";
import { CryptocurrencyStore } from "entities/viewer";
import { twMerge } from "tailwind-merge";

export const DepositBitcoinBlock = ({ className, ...props }: ButtonProps) => {
  const [value, setValue] = useState<string>("5");

  const addBitcoins = () => {
    if (+value > 100) {
      toast(`А морда не треснет??? ${bitcoinToString(+value)} он захотел!`);
    } else {
      CryptocurrencyStore.setNumberOfBitcoinsTheViewerHas =
        CryptocurrencyStore.numberOfBitcoinsTheViewerHas + Number(value);
    }
  };

  return (
    <>
      <BlockTitle>Добавить {bitcoinToString(+value)} на счет</BlockTitle>

      <List strongIos dividersIos insetIos>
        <ListInput
          clearButton
          label="Количество биткоинов для добавления"
          placeholder="Введите количество биткоинов"
          type="number"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></ListInput>
      </List>

      <Block>
        <Button
          large
          outline
          fill
          disabled={value === "" || value === "0"}
          onClick={addBitcoins}
        >
          Добавить
        </Button>
      </Block>
    </>
  );
};
