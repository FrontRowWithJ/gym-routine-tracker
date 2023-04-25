export interface Workout {
  workoutName: string;
  numOfSets: number;
  numOfReps: number;
  unit: "" | "mins" | "kg" | "s";
  unitAmount: number;
  videoURL: "" | `https://www.youtube.com/embed/${string}`;
  amount: number;
}

export type muscleGroup = (typeof muscleGroups)[number];

export type Routine = {
  [key in muscleGroup | "cardio" | "abs"]: readonly Workout[];
};

export const muscleGroups = [
  "chest",
  "back",
  "shoulder",
  "leg",
  "arm",
] as const;
