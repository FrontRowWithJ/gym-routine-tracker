import { IWorkout, muscleGroups } from "./workoutData";
import "./card.css";
import { backend_uri } from "./util";
import React, { CSSProperties, useState } from "react";
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
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>();
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
        <div className="save-container">
          <div
            className="save-button noselect"
            onPointerDown={() => {
              fetch(`${backend_uri}?${new URLSearchParams({ muscleGroup })}`, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
              }).then(({ status }) => {
                if (status === 200) {
                  setIndicatorStyle({ opacity: 1, bottom: "4rem" });
                  setTimeout(() => setIndicatorStyle({}), 1000);
                }
              });
            }}
          >
            save
          </div>
          <div className="save-indicator" style={indicatorStyle}>
            Saved!
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
