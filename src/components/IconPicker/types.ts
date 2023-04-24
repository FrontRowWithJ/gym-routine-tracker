import { muscleGroups } from "../../misc/types";

export interface IconPickerProps {
  muscleGroup: typeof muscleGroups[number];
  startColor: string;
  stopColor: string;
}
