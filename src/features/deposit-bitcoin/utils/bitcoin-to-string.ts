import { num2str } from "shared/lib/utils";

export const bitcoinToString = (bitcoins: number) => {
  let tmp = bitcoins + " " +
    num2str(bitcoins, [
      "биткоин",
      "биткоина",
      "биткоинов",
    ]);
  return tmp;
};
