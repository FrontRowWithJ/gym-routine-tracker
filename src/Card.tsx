import { IWorkout, muscleGroups } from "./workoutData";
import "./card.css";
import React, { CSSProperties } from "react";
import Workout from "./Workout";
import Label from "./Label";

interface CardProp {
  routine: readonly IWorkout[];
  muscleGroup: typeof muscleGroups[number];
  data: number[] | undefined;
  setData: React.Dispatch<React.SetStateAction<number[] | undefined>>;
  style?: CSSProperties;
  cardRef: React.RefObject<HTMLDivElement>;
}

const Card = ({
  routine,
  muscleGroup,
  data,
  setData,
  style,
  cardRef,
}: CardProp) => {
  const mGroup = muscleGroup === "arms" ? "arm" : muscleGroup;
  const increase = (data: number[] | undefined, i: number) =>
    data && setData(data.map((n, _i) => (i === _i ? n + 1 : n)));
  const decrease = (data: number[] | undefined, i: number) =>
    data && data[i] > 0 && setData(data.map((n, _i) => (i === _i ? n - 1 : n)));
  return (
    <div ref={cardRef} className="card-container noselect" style={style}>
      <header className="noselect">{mGroup}</header>
      <section>
        <div className="muscle-group-container">
          <div className="scroller">
            {routine.map(({ workoutName, numOfSets, numOfReps }, i) => {
              return (
                <React.Fragment key={`${i}${muscleGroup}${workoutName}`}>
                  {i === 0 && (
                    <Label
                      pos={0}
                      bar={
                        ["⎯⎯⎯", "⎯⎯⎯⎯", "⎯⎯⎯", "⎯⎯⎯⎯", "⎯⎯⎯⎯"][
                          muscleGroups.indexOf(muscleGroup)
                        ]
                      }
                      text={`${mGroup} Excersizes`}
                    />
                  )}
                  {i === routine.length - 4 && (
                    <Label pos={1} bar="⎯⎯⎯⎯" text="Ab exercises" />
                  )}
                  {i === routine.length - 1 && (
                    <Label pos={2} bar="⎯⎯⎯⎯⎯⎯" text="Cardio" />
                  )}
                  <Workout
                    workoutName={workoutName}
                    numOfSets={numOfSets}
                    numOfReps={numOfReps}
                    level={data && data[i]}
                    increase={() => increase(data, i)}
                    decrease={() => decrease(data, i)}
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
