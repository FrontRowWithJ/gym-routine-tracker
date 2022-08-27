import { IWorkout, muscleGroups } from "./workoutData";
import "./card.css";
import React, { CSSProperties } from "react";
import Workout from "./Workout";
import Label from "./Label";

interface CardProp {
  routine: readonly IWorkout[];
  muscleGroup: typeof muscleGroups[number];
  data: number[];
  setData: (arr: number[]) => void;
  style?: CSSProperties;
  cardRef: React.RefObject<HTMLDivElement>;
  updateExcersizeData: (index: number, val: number) => void;
}

const Card = ({
  routine,
  muscleGroup,
  data,
  setData,
  style,
  cardRef,
  updateExcersizeData,
}: CardProp) => {
  const setWorkoutValues = (i: number, val: number) => {
    if (data) {
      let offset = 0;
      while (++offset < 5 && i !== data.length - offset);
      if (i === data.length - offset) updateExcersizeData(offset, val);
      else setData(data.map((n, _i) => (i === _i ? n + val : n)));
    }
  };

  return (
    <div ref={cardRef} className="card-container noselect" style={style}>
      <header className="noselect">{muscleGroup}</header>
      <section>
        <div className="muscle-group-container">
          <div className="scroller">
            {routine.map(({ workoutName, numOfSets, numOfReps }, i) => {
              return (
                <React.Fragment key={`${i}${muscleGroup}${workoutName}`}>
                  {i === 0 && (
                    <Label pos={0} text={`${muscleGroup} Excersizes`} />
                  )}
                  {i === routine.length - 4 && (
                    <Label pos={1} text="Ab exercises" />
                  )}
                  {i === routine.length - 1 && <Label pos={2} text="Cardio" />}
                  <Workout
                    workoutName={workoutName}
                    numOfSets={numOfSets}
                    numOfReps={numOfReps}
                    level={data && data[i]}
                    increase={() => setWorkoutValues(i, 1)}
                    decrease={() => setWorkoutValues(i, -1)}
                  />
                </React.Fragment>
              );
            })}
            <div style={{ height: "4.5rem" }}></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
