import "./card.css";
import React, { useRef, useState } from "react";
import { Workout } from "../Workout";
import { Label } from "../Label";
import { IconPicker } from "../IconPicker";
import { Workout as WorkoutType, times, useToggle } from "../../misc";
import { CardProp } from "./types";
import { Add } from "../../resources/SVG";
import { AddWorkoutModal } from "./AddWorkoutModal";

const setWorkoutValues = (
  i: number,
  val: number,
  setData: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const increase = () =>
    setData((data) => data.map((n, _i) => (i === _i ? n + val : n)));
  const decrease = () =>
    setData((data) =>
      data.map((n, _i) => (i === _i ? Math.max(n - val, 0) : n))
    );
  return [increase, decrease] as const;
};

const startColors = ["#ffa500", "#227e22", "#f83600"] as const;
const stopColors = ["yellow", "#66ff00", "#ee812b"] as const;
const HEIGHT_OF_SPACER_IN_PX = 176; // 11rem

export const Card = ({
  muscleGroup,
  style,
  cardRef,
  routineData,
  muscleGroupRoutine,
  setMuscleGroupRoutine,
  cardioRoutine,
  absRoutine,
  setRoutineData,
  cardioData,
  setCardioData,
  absData,
  setAbsData,
}: CardProp) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRefs = times(3, React.createRef<HTMLDivElement>);
  const [canShowRoutine, enableRoutine, disableRoutine] = useToggle(
    muscleGroupRoutine.length
  );
  const [canShowAbs, enableAbs, disableAbs] = useToggle(absRoutine.length);
  const [canShowCardio, enableCardio, disableCardio] = useToggle(
    cardioRoutine.length
  );
  const [{ startColor, stopColor }, setColors] = useState<{
    startColor: (typeof startColors)[number];
    stopColor: (typeof stopColors)[number];
  }>({
    startColor: startColors[0],
    stopColor: stopColors[0],
  });

  const [canShowModal, enableModal, disableModal] = useToggle();
  const [hasVideo, setHasVideo] = useState<boolean>(false);
  return (
    <>
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
                  Math.abs(
                    (label?.getBoundingClientRect().y as number) - parentY
                  )
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
              <Label
                pos={0}
                text={`${muscleGroup} Exercises`}
                labelRef={labelRefs[0]}
              ></Label>
              {muscleGroupRoutine.map((workout, i) => {
                const { workoutName, numOfSets, numOfReps } = workout;
                const { unit, videoURL, unitAmount } = workout;
                const [increase, decrease] = setWorkoutValues(
                  i,
                  unitAmount,
                  setRoutineData
                );
                return (
                  <Workout
                    {...{
                      workoutName,
                      numOfReps,
                      numOfSets,
                      unit,
                      disable: disableRoutine,
                      videoURL,
                    }}
                    key={`${i}routine`}
                    level={routineData[i]}
                    {...{ increase, decrease }}
                    canShow={!!videoURL && canShowRoutine[i]}
                    enable={() => !!videoURL && enableRoutine(i)}
                  />
                );
              })}
              <div className="add-button" onClick={enableModal}>
                <Add fill="white" />
              </div>
              <Label
                pos={1}
                text="Abs Exercises"
                labelRef={labelRefs[1]}
              ></Label>
              {absRoutine.map((workout, i) => {
                const { workoutName, numOfSets, numOfReps } = workout;
                const { unit, videoURL, unitAmount } = workout;
                const [increase, decrease] = setWorkoutValues(
                  i,
                  unitAmount,
                  setAbsData
                );
                return (
                  <Workout
                    {...{
                      workoutName,
                      numOfReps,
                      numOfSets,
                      unit,
                      disable: disableAbs,
                      videoURL,
                    }}
                    level={absData[i]}
                    key={`${i}abs`}
                    {...{ increase, decrease }}
                    canShow={!!videoURL && canShowAbs[i]}
                    enable={() => !!videoURL && enableAbs(i)}
                  ></Workout>
                );
              })}
              <Label
                pos={2}
                text="Cardio Exercises"
                labelRef={labelRefs[2]}
              ></Label>
              {cardioRoutine.map((workout, i) => {
                const { workoutName, numOfSets, numOfReps } = workout;
                const { unit, videoURL, unitAmount } = workout;
                const [increase, decrease] = setWorkoutValues(
                  i,
                  unitAmount,
                  setCardioData
                );
                return (
                  <Workout
                    {...{
                      workoutName,
                      numOfReps,
                      numOfSets,
                      unit,
                      disable: disableCardio,
                      videoURL,
                    }}
                    key={`${i}cardio`}
                    level={cardioData[i]}
                    {...{ increase, decrease }}
                    canShow={!!videoURL && canShowCardio[i]}
                    enable={() => !!videoURL && enableCardio(i)}
                  ></Workout>
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
      {canShowModal && (
        <AddWorkoutModal
          {...{
            hasVideo,
            setHasVideo,
            disable: disableModal,
            updateRoutineData: (workout: WorkoutType) => {
              setRoutineData((curr) => [...curr, workout.amount]);
              setMuscleGroupRoutine((curr) => [...curr, workout]);
            },
          }}
        />
      )}
    </>
  );
};