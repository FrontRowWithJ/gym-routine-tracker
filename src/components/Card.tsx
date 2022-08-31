import { IWorkout, muscleGroups } from "../misc/workoutData";
import "../style/card.css";
import React, { CSSProperties, useRef, useState } from "react";
import Workout from "./Workout";
import Label from "./Label";
import IconPicker from "./IconPicker";
import { times } from "../misc/util";

interface CardProp {
  routine: readonly IWorkout[];
  muscleGroup: typeof muscleGroups[number];
  data: number[];
  setData: (arr: number[]) => void;
  style?: CSSProperties;
  cardRef: React.RefObject<HTMLDivElement>;
  updateExcersizeData: (index: number, val: number) => void;
}

const startColors = ["#ffa500", "#227e22", "#f83600"] as const;
const stopColors = ["yellow", "#66ff00", "#ee812b"] as const;
const HEIGHT_OF_SPACER_IN_PX = 176; // 11rem
const Card = ({
  routine,
  muscleGroup,
  data,
  setData,
  style,
  cardRef,
  updateExcersizeData,
}: CardProp) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRefs = times(3, () => React.createRef<HTMLDivElement>());
  const [{ startColor, stopColor }, setColors] = useState<{
    startColor: typeof startColors[number];
    stopColor: typeof stopColors[number];
  }>({
    startColor: startColors[0],
    stopColor: stopColors[0],
  });
  const setWorkoutValues = (i: number, val: number) => {
    if (data) {
      let offset = 0;
      while (++offset < 5 && i !== data.length - offset);
      if (i === data.length - offset) updateExcersizeData(offset, val);
      else setData(data.map((n, _i) => (i === _i ? n + val : n)));
    }
  };
  const conditions: ((i: number) => boolean)[] = [
    (i) => i === 0,
    (i) => i === routine.length - 4,
    (i) => i === routine.length - 1,
  ];
  return (
    <div ref={cardRef} className="card-container noselect" style={style}>
      <IconPicker {...{ startColor, stopColor, muscleGroup }} />
      <section>
        <div
          className="muscle-group-container"
          ref={containerRef}
          onScroll={({ currentTarget }) => {
            const { current: node } = scrollerRef;
            if (node) {
              const { y: parentY } = currentTarget.getBoundingClientRect();
              const arr = labelRefs.map(({ current: label }) =>
                Math.abs((label?.getBoundingClientRect().y as number) - parentY)
              );
              const min = Math.min(...arr);
              const minIndex = arr.findIndex((n) => n === min);
              const startColor = startColors[minIndex];
              const stopColor = stopColors[minIndex];
              setColors({ startColor, stopColor });
            }
          }}
        >
          <div className="scroller" ref={scrollerRef}>
            {routine.map(({ workoutName, numOfSets, numOfReps, unit }, i) => {
              return (
                <React.Fragment key={`${i}${muscleGroup}${workoutName}`}>
                  {conditions.map(
                    (cond, j) =>
                      cond(i) && (
                        <Label
                          key={`${i}+${j}`}
                          pos={j}
                          text={
                            j === 0
                              ? `${muscleGroup} Exercises`
                              : ["Ab Exercises", "Cardio"][j - 1]
                          }
                          labelRef={labelRefs[j]}
                        />
                      )
                  )}
                  <Workout
                    {...{ workoutName, numOfReps, numOfSets, unit }}
                    level={data && data[i]}
                    increase={() => setWorkoutValues(i, 2.5)}
                    decrease={() => setWorkoutValues(i, -2.5)}
                  />
                </React.Fragment>
              );
            })}
            {containerRef.current && (
              <div
                style={{
                  height: `${Math.abs(
                    containerRef.current.getBoundingClientRect().height -
                      HEIGHT_OF_SPACER_IN_PX
                  )}px`,
                }}
              ></div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
