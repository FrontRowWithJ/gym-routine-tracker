import { IWorkout } from "./workoutData";
import "./card.css";
import { db_url, useSwitch } from "./util";
import { CSSProperties, useState } from "react";

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
  const [opacities, setOpacities] = useSwitch(routine.length, 0);
  const [tops, setTop] = useSwitch(routine.length, "-50%");
  const [canPress, setPress] = useSwitch(routine.length, true);
  const increase = (data: number[], i: number) => {
    data[i]++;
    setData([...data]);
  };
  const decrease = (data: number[], i: number) => {
    data[i] = data[i] + (data[i] > 0 ? -1 : 0);
    setData([...data]);
  };

  return (
    <div ref={cardRef} className="card-container noselect" style={style}>
      <header className="noselect">{muscleGroup}</header>
      <section>
        <div className="muscle-group-container">
          <div className="scroller">
            {routine.map(({ workoutName, numOfSets, numOfReps }, i) => {
              return (
                <div className="workout-row" key={`${workoutName}${i}`}>
                  <div
                    className="workout-label"
                    style={{ cursor: canPress[i] ? "pointer" : "not-allowed" }}
                    onPointerDown={() => {
                      if (canPress[i]) {
                        setPress(i, false);
                        setOpacities(i, 1);
                        setTop(i, "133.333%");
                        setTimeout(() => {
                          setPress(i, true);
                          setOpacities(i, 0);
                          setTop(i, "-100%");
                        }, 1500);
                      }
                    }}
                  >
                    {workoutName}
                    <div
                      className="set-info noselect"
                      style={{ opacity: opacities[i], top: tops[i] }}
                    >
                      Sets: {numOfSets}
                      <br />
                      Reps: {numOfReps}
                      <div className="triangle"></div>
                    </div>
                  </div>
                  {data && (
                    <div className="input-container">
                      <div
                        onContextMenu={(e) => e.preventDefault()}
                        draggable={false}
                        onPointerDown={() => increase(data, i)}
                        className="increase-button"
                      >
                        +
                      </div>
                      <div className="weight-label">{data[i]}</div>
                      <div
                        onPointerDown={() => decrease(data, i)}
                        className="decrease-button"
                      >
                        -
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="save-button noselect"
          onPointerDown={() => {
            setIndicatorStyle({ opacity: 1, bottom: "4rem" });
            setTimeout(() => setIndicatorStyle({}), 1000);
            fetch(`${db_url}?${new URLSearchParams({ muscleGroup })}`, {
              method: "POST",
              mode: "cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
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
