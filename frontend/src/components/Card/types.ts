import { CSSProperties } from "react";
import { Routine, muscleGroup } from "../../misc/types";

export interface CardProp {
  muscleGroup: muscleGroup;
  style?: CSSProperties;
  cardRef: React.RefObject<HTMLDivElement>;
  muscleGroupRoutine: Routine;
  setMuscleGroupRoutine: React.Dispatch<
    React.SetStateAction<Routine>
  >;
  cardioRoutine: Routine;
  setCardioRoutine: React.Dispatch<React.SetStateAction<Routine>>;
  absRoutine: Routine;
  setAbsRoutine: React.Dispatch<React.SetStateAction<Routine>>;
}
