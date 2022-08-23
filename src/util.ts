import { useState } from "react";
type Callback<T> = (value: number) => T;

export const times = <T>(n: number, iter: Callback<T>) =>
  [...new Array(n).keys()].map<T>(iter);

export const db_url = "https://gym-routine-backend.herokuapp.com/";

type ISwitch = <T>(
  length: number,
  def: T
) => [T[], (index: number, val: T) => void];

export const useSwitch: ISwitch = <T>(length: number, def: T) => {
  const [arr, setArr] = useState<T[]>(times(length, () => def));
  const set = (index: number, val: T) => {
    arr[index] = val;
    setArr([...arr]);
  };
  return [arr, set];
};

export const translate = (e: HTMLDivElement, d: number) =>
  e && (e.style.left = d + "px");
export const getLeft = (i: number, x: number) => (i - x) * 100 + "%";
