import { ABS_AND_CARDIO, IWorkout, muscleGroups } from "../misc/workoutData";
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
  cardioAndAbsData: number[];
  setCardioAndAbsData: (arr: number[]) => void;
}

const setWorkoutValues = (
  i: number,
  val: number,
  data: number[],
  setData: (arr: number[]) => void
) => setData(data.map((n, _i) => (i === _i ? n + val : n)));

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
  cardioAndAbsData,
  setCardioAndAbsData,
}: CardProp) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRefs = times(3, React.createRef<HTMLDivElement>);
  const [canShow, setShow] = useState<boolean[]>(
    times(routine.length + ABS_AND_CARDIO.length, false)
  );
  const disable = () => setShow(canShow.map(() => false));
  const enable = (i: number) =>
    setShow(canShow.map((b, _i) => (_i === i ? true : b)));
  const [{ startColor, stopColor }, setColors] = useState<{
    startColor: typeof startColors[number];
    stopColor: typeof stopColors[number];
  }>({
    startColor: startColors[0],
    stopColor: stopColors[0],
  });

  const conditions: ((i: number) => boolean)[] = [
    (i) => i === 0,
    (i) => i === ABS_AND_CARDIO.length + routine.length - 4,
    (i) => i === ABS_AND_CARDIO.length + routine.length - 1,
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
            {[...routine, ...ABS_AND_CARDIO].map(
              ({ workoutName, numOfSets, numOfReps, unit, videoURL }, i) => {
                const dataArr = i < routine.length ? data : cardioAndAbsData;
                const setDataArr =
                  i < routine.length ? setData : setCardioAndAbsData;
                const index = i % routine.length;
                return (
                  <React.Fragment key={`${i}${muscleGroup}${workoutName}`}>
                    {conditions.map(
                      (cond, j) =>
                        cond(i) && (
                          <Label
                            key={`${i}-${j}`}
                            pos={j}
                            text={`
                            ${[muscleGroup, "Abs", "Cardio"][j]} Excersizes`}
                            labelRef={labelRefs[j]}
                          />
                        )
                    )}
                    <Workout
                      {...{ workoutName, numOfReps, numOfSets, unit, disable }}
                      videoURL={videoURL}
                      level={dataArr[index]}
                      increase={() =>
                        setWorkoutValues(index, 2.5, dataArr, setDataArr)
                      }
                      decrease={() =>
                        setWorkoutValues(index, -2.5, dataArr, setDataArr)
                      }
                      zIndex={5 + routine.length + ABS_AND_CARDIO.length - i}
                      canShow={!!videoURL && canShow[i]}
                      enable={() => !!videoURL && enable(i)}
                    />
                  </React.Fragment>
                );
              }
            )}
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
