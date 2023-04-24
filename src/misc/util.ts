type Callback<T> = (value: number) => T;

export function times<T>(n: number, iter: T | Callback<T>) {
  const cb = typeof iter === "function" ? iter : () => iter;
  return [...new Array(n).keys()].map(cb as Callback<T>);
}

export const BASE_URL = `${
  process.env["NODE_ENV"] === "development"
    ? "http://localhost:8888"
    : "https://gym-tracker-db.netlify.app"
}/.netlify/functions/` as const;
export const translate = (e: HTMLDivElement, d: number) =>
  e && (e.style.left = d + "px");
export const getLeft = (i: number, x: number) => (i - x) * 100 + "%";
