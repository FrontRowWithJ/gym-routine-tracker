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
  const mGroup = muscleGroup === "arms" ? "arm" : muscleGroup;
  const increase = (data: number[], i: number) =>
    setData(data.map((n, _i) => (i === _i ? n + 1 : n)));
  const decrease = (data: number[], i: number) =>
    setData(data.map((n, _i) => (i === _i ? n - 1 : n)));
  return (
    <div ref={cardRef} className="card-container noselect" style={style}>
      <header className="noselect">{mGroup}</header>
      <section>
        <div className="muscle-group-container">
          <div className="scroller">
            {routine.map(({ workoutName, numOfSets, numOfReps }, i) => {
              return (
                <React.Fragment key={`${i}${muscleGroup}${workoutName}`}>
                  {i === 0 && <Label pos={0} text={`${mGroup} Excersizes`} />}
                  {i === routine.length - 4 && (
                    <Label pos={1} text="Ab exercises" />
                  )}
                  {i === routine.length - 1 && <Label pos={2} text="Cardio" />}
                  <Workout
                    workoutName={workoutName}
                    numOfSets={numOfSets}
                    numOfReps={numOfReps}
                    level={data && data[i]}
                    increase={() => {
                      if (data) {
                        let offset = 1;
                        while (offset < 5 && i !== data.length - offset++)
                          if (i !== data.length - offset)
                            updateExcersizeData(4, -1);
                          else increase(data, i);
                      }
                    }}
                    decrease={() => {
                      if (data) {
                        let offset = 1;
                        while (offset < 5 && i !== data.length - offset++);
                        if (i !== data.length - offset)
                          updateExcersizeData(4, -1);
                        else decrease(data, i);
                      }
                    }}
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
