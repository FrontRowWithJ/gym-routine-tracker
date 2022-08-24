type Callback<T> = (value: number) => T;

export const times = <T>(n: number, iter: Callback<T>) =>
  [...new Array(n).keys()].map<T>(iter);

export const backend_uri = "https://gym-routine-backend.herokuapp.com/";

export const translate = (e: HTMLDivElement, d: number) =>
  e && (e.style.left = d + "px");
export const getLeft = (i: number, x: number) => (i - x) * 100 + "%";
