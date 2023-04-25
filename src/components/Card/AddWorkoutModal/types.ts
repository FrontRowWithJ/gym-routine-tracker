import { Workout } from "../../../misc";

export interface AddWorkoutModalProps {
  hasVideo: boolean;
  setHasVideo: React.Dispatch<React.SetStateAction<boolean>>;
  disable: () => void;
  updateRoutineData: (workout: Workout) => void;
}
