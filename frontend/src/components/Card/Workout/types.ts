import { Workout } from "../../../misc";

export interface WorkoutProps {
  workout: Workout;
  increase: () => void;
  decrease: () => void;
  canShow: boolean;
  enable: () => void;
  disable: () => void;
  removeWorkout: () => void;
}
