import { ArmPaths } from "./Arm";
import { BackPaths } from "./Back";
import { ChestPaths } from "./Chest";
import { LegPaths } from "./Leg";
import { ShoulderPaths } from "./Shoulder";

export const MuscleGroupPaths = {
  arm: ArmPaths,
  back: BackPaths,
  chest: ChestPaths,
  leg: LegPaths,
  shoulder: ShoulderPaths,
} as const;
