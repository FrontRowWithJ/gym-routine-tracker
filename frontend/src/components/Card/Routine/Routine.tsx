import { Workout } from "../Workout";
import { setWorkoutValues } from "../../../misc";
import { RoutineProps } from "./types";
import React from "react";

export const Routine = ({
  routine,
  setRoutine,
  canShow,
  enable,
  disable,
}: RoutineProps) => {
  return (
    <>
      {routine.map((workout, i) => {
        const { videoURL } = workout;
        const [increase, decrease] = setWorkoutValues(i, setRoutine);
        return (
          <Workout
            key={i}
            {...{
              workout,
              increase,
              decrease,
              disable,
              enable: () => !!videoURL && enable(i),
              canShow: !!videoURL && canShow[i],
              removeWorkout: () => {
                const newRoutine = [...routine];
                newRoutine.splice(i, 1);
                setRoutine(newRoutine);
              },
            }}
          />
        );
      })}
    </>
  );
};
