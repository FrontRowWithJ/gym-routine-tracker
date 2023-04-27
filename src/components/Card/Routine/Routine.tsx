import { Workout } from "../Workout";
import { setWorkoutValues } from "../../../misc";
import { RoutineProps } from "./types";

export const Routine = ({
  routine,
  canShow,
  enable,
  disable,
  setRoutine,
}: RoutineProps) => {
  return (
    <>
      {routine.map((workout, i) => {
        const { videoURL, unitAmount } = workout;
        const [increase, decrease] = setWorkoutValues(
          i,
          unitAmount,
          setRoutine
        );
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
