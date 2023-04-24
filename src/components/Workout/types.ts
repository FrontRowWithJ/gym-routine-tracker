export interface WorkoutProps {
  workoutName: string;
  numOfSets: number;
  numOfReps: number;
  level: number;
  increase: () => void;
  decrease: () => void;
  unit: string;
  canShow: boolean;
  enable: () => void;
  disable: () => void;
  videoURL?: string;
}
