export interface Workout {
  workoutName: string;
  numOfSets: number;
  numOfReps: number;
  unit: "" | "mins" | "kg" | "s";
  unitAmount: number;
  videoURL: "" | `https://www.youtube.com/embed/${string}`;
  amount: number;
}

export type Routine = readonly Workout[];

export type muscleGroup = (typeof muscleGroups)[number];

export type Routines = { [key in muscleGroup | "cardio" | "abs"]: Routine };

export const muscleGroups = [
  "chest",
  "back",
  "shoulder",
  "leg",
  "arm",
] as const;

type route = "login" | "register" | "";

export type screenRoute =
  | `/${route | `musclegroup/${muscleGroup}`}`
  | "/*";
