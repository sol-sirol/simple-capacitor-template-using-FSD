import qs from "qs";

//парсит строку гет параметров в объект
export const getQuery = (query: string, options?: qs.IParseOptions) => {
  return qs.parse(query, { ...options });
};

//собирает строку из объекта параметров
export const setQuery = (params: any, options?: qs.IStringifyOptions) => {
  return qs.stringify(params, { ...options });
};

export const EventEmitter = {
  events: {},
  execute: function (event: string, data: any) {
    //@ts-ignore
    if (!this.events[event]) return;
    //@ts-ignore
    this.events[event].forEach((callback: (data: any) => void) =>
      callback(data)
    );
  },
  subscribe: function (event: string, callback: (data?: any) => void) {
    //@ts-ignore
    if (!this.events[event]) this.events[event] = [];
    //@ts-ignore
    this.events[event].push(callback);
  },
  delete: function (event: string) {
    //@ts-ignore
    delete this.events[event];
  },
};

//рандомное число, для создания идентификаторов
export const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getDeviceType = () => {
  const ua = window.navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

/**
 * функция для выбора нужного сколнения слова на основе переданного значения
 * @param n - значение, относительно которого нужно склонять слово
 * @param textForms - склонения слова - 1, 2, 5 - [человек, человека, человек]
 * @returns 
 */
export const num2str = (n: number, textForms: string[]) => {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 === 1) {
    return textForms[0];
  }
  return textForms[2];
};

export const copy = <T>(data: T): T => JSON.parse(JSON.stringify(data));
