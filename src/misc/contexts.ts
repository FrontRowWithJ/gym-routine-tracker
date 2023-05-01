import { createContext } from "react";
import { screenRoute } from "./types";

export const PathContext = createContext<{
  path?: screenRoute;
  setPath?: React.Dispatch<React.SetStateAction<screenRoute>>;
}>({});
