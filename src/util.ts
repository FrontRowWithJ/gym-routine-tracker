type Callback<T> = (value: number) => T;

export const times = <T>(n: number, iter: Callback<T>) =>
  [...new Array(n).keys()].map<T>(iter);

// const baseURL = "http://localhost:8888"
const baseURL = "https://gym-tracker-db.netlify.app";
export const getGymDataURL = `${baseURL}/.netlify/functions/get_gym_routine`;
export const updateGymDataURL = `${baseURL}/.netlify/functions/update_gym_routine`;
export const translate = (e: HTMLDivElement, d: number) =>
  e && (e.style.left = d + "px");
export const getLeft = (i: number, x: number) => (i - x) * 100 + "%";
