import {makeAutoObservable} from 'mobx';

interface ProfilePageStoreState {
  points: number;
  getPoints(id: number): void;
}

//TODO: Ответить на вопрос: так ли нужно описывать interface для стора
class store {
  constructor() {
    makeAutoObservable(this);
  }

  points: number = 0;

  set setPoints(value: number) {
    this.points = value
  }

  getPoints = (id: number) => {
    return new Promise<number>((resolve, reject) => {
      const tmp = Math.floor(Math.random() * 101) + id
      resolve(tmp);
      this.setPoints = tmp
      // qPoints({id: id})
      //   .then((data) => {
      //     this.setPoints = data.points;
      //     resolve(data)
      //   })
      //   .catch((err) => {
      //     reject(err)
      //   });
    });
  }
}

export const profilePageStore = new store() as ProfilePageStoreState;
