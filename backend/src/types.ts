import { Handler } from "@netlify/functions";

export type Workout = {
  workoutName: string;
  numOfSets: number;
  numOfReps: number;
  unit: "" | "mins" | "kg" | "s";
  unitAmount: number;
  videoURL: "" | `https://www.youtube.com/embed/${string}`;
  amount: number;
};

export type muscleGroups = ["chest", "back", "shoulder", "leg", "arm"];

export type muscleGroup = muscleGroups[number];

export type Routine = readonly Workout[];

export type Routines = { [key in muscleGroup | "cardio" | "abs"]: Routine };

export type Credentials = { password: string; salt: string };

export type RegisterBody = {
  username: string | undefined;
  password: string | undefined;
};

export type LoginBody = {
  username: string | undefined;
  password: string | undefined;
};

export type Document<T> = { [key: string]: T | undefined };

export type EventHeaders = Parameters<Handler>[0]["headers"];
