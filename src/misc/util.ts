type Callback<T> = (value: number) => T;
type Value<T> = T;
type CB<T> = Callback<T> | Value<T>;

export const times = <T>(n: number, iter: CB<T>) => {
  if (typeof iter === "function")
    return [...new Array(n).keys()].map<T>(iter as Callback<T>);
  else return [...new Array(n).keys()].map<typeof iter>(() => iter);
};

// const baseURL = "http://localhost:8888"
const baseURL = "https://gym-tracker-db.netlify.app";
export const getGymDataURL = `${baseURL}/.netlify/functions/get_gym_routine`;
export const updateGymDataURL = `${baseURL}/.netlify/functions/update_gym_routine`;
export const translate = (e: HTMLDivElement, d: number) =>
  e && (e.style.left = d + "px");
export const getLeft = (i: number, x: number) => (i - x) * 100 + "%";

export interface IconProp {
  startColor: string;
  stopColor: string;
}
