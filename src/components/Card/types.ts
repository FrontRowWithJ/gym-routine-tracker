import { CSSProperties } from "react";
import { Workout, muscleGroup } from "../../misc/types";

export interface CardProp {
  muscleGroup: muscleGroup;
  style?: CSSProperties;
  cardRef: React.RefObject<HTMLDivElement>;
  muscleGroupRoutine: readonly Workout[];
  setMuscleGroupRoutine: React.Dispatch<
    React.SetStateAction<readonly Workout[]>
  >;
  cardioRoutine: readonly Workout[];
  absRoutine: readonly Workout[];
  routineData: number[];
  setRoutineData: React.Dispatch<React.SetStateAction<number[]>>;
  cardioData: number[];
  setCardioData: React.Dispatch<React.SetStateAction<number[]>>;
  absData: number[];
  setAbsData: React.Dispatch<React.SetStateAction<number[]>>;
}
