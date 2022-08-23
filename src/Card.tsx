import { IWorkout } from "./workoutData";
import "./card.css";
import { db_url } from "./util";
import { CSSProperties, useState } from "react";
import Workout from "./Workout";

interface CardProp {
  routine: readonly IWorkout[];
  muscleGroup: string;
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
  const increase = (data: number[], i: number) =>
    setData(data.map((n, _i) => (i === _i ? n + 1 : n)));
  const decrease = (data: number[], i: number) =>
    data[i] > 0 && setData(data.map((n, _i) => (i === _i ? n - 1 : n)));
  return (
    <div ref={cardRef} className="card-container noselect" style={style}>
      <header className="noselect">{muscleGroup}</header>
      <section>
        <div className="muscle-group-container">
          <div className="scroller">
            {routine.map(({ workoutName, numOfSets, numOfReps }, i) => {
              return (
                data && (
                  <Workout
                    workoutName={workoutName}
                    numOfSets={numOfSets}
                    numOfReps={numOfReps}
                    level={data[i]}
                    increase={() => increase(data, i)}
                    decrease={() => decrease(data, i)}
                  />
                )
              );
            })}
          </div>
        </div>
        <div
          className="save-button noselect"
          onPointerDown={() => {
            fetch(`${db_url}?${new URLSearchParams({ muscleGroup })}`, {
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
      </section>
    </div>
  );
};

export default Card;
