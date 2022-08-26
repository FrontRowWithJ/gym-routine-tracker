type Callback<T> = (value: number) => T;

export const times = <T>(n: number, iter: Callback<T>) =>
  [...new Array(n).keys()].map<T>(iter);

const baseURL = "https://630915ef220a210304d38336--gym-tracker-db.netlify.app";
export const getGymDataURL = `${baseURL}/.netlify/functions/get_gym_routine`;
export const updateGymDataURL = `${baseURL}/.netlify/functions/update_gym_routine`;
export const translate = (e: HTMLDivElement, d: number) =>
  e && (e.style.left = d + "px");
export const getLeft = (i: number, x: number) => (i - x) * 100 + "%";
