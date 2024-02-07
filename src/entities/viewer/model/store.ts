import { makeAutoObservable, configure } from "mobx";

configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true
})

class store {
  constructor() {
    makeAutoObservable(this);
  }

  numberOfBitcoinsTheViewerHas: number = 0;
  bitcoinPrice: number = 0;

  set setBitcoinPrice(value: number) {
    this.bitcoinPrice = value;
  }
  set setNumberOfBitcoinsTheViewerHas(value: number) {
    this.numberOfBitcoinsTheViewerHas = value;
  }

  getBitcoinPrice = () => {
    return new Promise<number>((resolve, reject) => {
      const tmp =
        Math.floor(Math.random() * 101) +
        Math.floor(Math.random() * 101) +
        Math.floor(Math.random() * 101) +
        Math.floor(Math.random() * 101);
      resolve(tmp);
      this.setBitcoinPrice = tmp;
      // qBitcoinPoints({id: id})
      //   .then((data) => {
      //     this.setBitcoinPoints = data.bitcoinPoints;
      //     resolve(data)
      //   })
      //   .catch((err) => {
      //     reject(err)
      //   });
    });
  };
  getNumberOfBitcoinsTheViewerHas = (id: number) => {
    return new Promise<number>((resolve, reject) => {
      const tmp = Math.floor(Math.random() * 11) + id;
      resolve(tmp);
      this.setNumberOfBitcoinsTheViewerHas = tmp;
    });
  };

  get getMoneyTheViewerHas() {
    return (this.bitcoinPrice * this.numberOfBitcoinsTheViewerHas).toFixed(2)
  }
}

export const CryptocurrencyStore = new store();
