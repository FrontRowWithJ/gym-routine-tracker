import { Routine } from "./types";
import React from "react";

type Callback<T> = (value: number) => T;

export function times<T>(n: number, iter: T | Callback<T>) {
  const cb = typeof iter === "function" ? iter : () => iter;
  return [...new Array(n).keys()].map(cb as Callback<T>);
}
export const FUNCTIONS_PATH = `${
  process.env["NODE_ENV"] === "DEVELOPMENT" ? "http://localhost:8888" : ""
}/.netlify/functions`;

export const translate = (e: HTMLDivElement, d: number) =>
  e && (e.style.left = d + "px");
export const getLeft = (i: number, x: number) => (i - x) * 100 + "%";

export const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const changeAmount = (routine: Routine, index: number, amount: number) => {
  const newRoutine = [...routine];
  newRoutine[index] = { ...newRoutine[index], amount };
  return newRoutine;
};

export const setWorkoutValues = (
  i: number,
  setRoutine: React.Dispatch<React.SetStateAction<Routine>>
) => {
  const increase = () => {
    setRoutine((routine) =>
      changeAmount(routine, i, routine[i].amount + routine[i].unitAmount)
    );
  };
  const decrease = () =>
    setRoutine((routine) =>
      changeAmount(
        routine,
        i,
        Math.max(routine[i].amount - routine[i].unitAmount, 0)
      )
    );
  return [increase, decrease] as const;
};

export const isLoggedIn = () => localStorage.getItem("loggedIn") === "true";
export const setLoggedIn = (loggedIn: boolean) =>
  localStorage.setItem("loggedIn", String(loggedIn));
