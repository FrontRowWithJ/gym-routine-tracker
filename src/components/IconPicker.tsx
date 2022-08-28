import ChestIcon from "./ChestIcon";
import BackIcon from "./BackIcon";
import ShoulderIcon from "./ShoulderIcon";
import LegIcon from "./LegIcon";
import ArmIcon from "./ArmIcon";
import { muscleGroups } from "../misc/workoutData";

interface IconPickerProp {
  muscleGroup: typeof muscleGroups[number];
  startColor: string;
  stopColor: string;
}
const IconPicker = ({ muscleGroup, startColor, stopColor }: IconPickerProp) =>
  ({
    chest: ChestIcon,
    back: BackIcon,
    shoulder: ShoulderIcon,
    leg: LegIcon,
    arm: ArmIcon,
  }[muscleGroup]({ startColor, stopColor }));

export default IconPicker;
