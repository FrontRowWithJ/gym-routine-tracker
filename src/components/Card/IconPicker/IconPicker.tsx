import {
  Arm as arm,
  Chest as chest,
  Back as back,
  Shoulder as shoulder,
  Leg as leg,
} from "../../../resources/SVG";
import { IconPickerProps } from "./types";

export const IconPicker = ({ muscleGroup, startColor, stopColor }: IconPickerProps) =>
  ({ chest, back, shoulder, leg, arm }[muscleGroup]({ startColor, stopColor }));
