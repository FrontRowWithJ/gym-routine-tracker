import "./card.css";
import React, { CSSProperties, useRef, useState } from "react";
import { Label } from "../Label";
import { times, useToggle } from "../../misc";
import { CardProp } from "./types";
import { AddWorkoutModal } from "./AddWorkoutModal";
import { Routine } from "./Routine";
import { AddButton } from "../AddButton";
import { MuscleGroup } from "../../resources/SVG";

const startColors = ["#ffa500", "#227e22", "#f83600"] as const;
const stopColors = ["yellow", "#66ff00", "#ee812b"] as const;
const HEIGHT_OF_SPACER_IN_PX = 224; // 14rem

const LEFT_POSITION: CSSProperties = {
  left: "10px",
  top: "10px",
  height: "40px",
  transform: "translate(0, 0)",
  opacity: 0.33,
};

const CENTER_POSITION: CSSProperties = {
  left: "50%",
  top: "50%",
  height: "80%",
  transform: "translate(-50%, -50%)",
  opacity: 1,
};

export const Card = ({
  muscleGroup,
  style,
  cardRef,
  muscleGroupRoutine,
  setMuscleGroupRoutine,
  cardioRoutine,
  setCardioRoutine,
  absRoutine,
  setAbsRoutine,
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
  const [iconStyle, setIconStyle] = useState<CSSProperties>(CENTER_POSITION);
  const spacerRef = useRef<HTMLDivElement>(null);
  const setRoutineRef = useRef(setMuscleGroupRoutine);
  const [title, setTitle] = useState<string>("Add Muscle Group Workout");
  return (
    <>
      <div ref={cardRef} className="card-container noselect" style={style}>
        <MuscleGroup
          {...{ startColor, stopColor, muscleGroup, style: iconStyle }}
        />
        <section>
          <div
            className="muscle-group-container"
            ref={containerRef}
            onScroll={({ currentTarget }) => {
              const { current: node } = scrollerRef;
              if (!node) return;
              const { y: parentY } = currentTarget.getBoundingClientRect();
              const arr = labelRefs.map(({ current: label }) =>
                Math.abs((label?.getBoundingClientRect().y as number) - parentY)
              );
              const min = Math.min(...arr);
              const { current: spacer } = spacerRef;
              if (!spacer) return;
              const { y: spacerY } = spacer.getBoundingClientRect();
              setIconStyle(spacerY < 0 ? LEFT_POSITION : CENTER_POSITION);
              const minIndex = arr.findIndex((n) => n === min);
              const startColor = startColors[minIndex];
              const stopColor = stopColors[minIndex];
              setColors({ startColor, stopColor });
            }}
          >
            <div ref={spacerRef} style={{ height: "20vh" }}></div>
            <div className="scroller" ref={scrollerRef}>
              <Label
                pos={0}
                text={`${muscleGroup} Exercises`}
                labelRef={labelRefs[0]}
              ></Label>
              <Routine
                routine={muscleGroupRoutine}
                setRoutine={setMuscleGroupRoutine}
                disable={disableRoutine}
                enable={enableRoutine}
                canShow={canShowRoutine}
              />
              <AddButton
                onClick={() => {
                  setRoutineRef.current = setMuscleGroupRoutine;
                  setTitle("Add Muscle Group Workout");
                  enableModal();
                }}
                text="Add muscle group workout"
              />
              <Label
                pos={1}
                text="Abs Exercises"
                labelRef={labelRefs[1]}
              ></Label>
              <Routine
                routine={absRoutine}
                setRoutine={setAbsRoutine}
                disable={disableAbs}
                enable={enableAbs}
                canShow={canShowAbs}
              />
              <AddButton
                onClick={() => {
                  setRoutineRef.current = setAbsRoutine;
                  setTitle("Add Abs Workout");
                  enableModal();
                }}
                text="Add abs workout"
              />
              <Label
                pos={2}
                text="Cardio Exercises"
                labelRef={labelRefs[2]}
              ></Label>
              <Routine
                routine={cardioRoutine}
                setRoutine={setCardioRoutine}
                disable={disableCardio}
                enable={enableCardio}
                canShow={canShowCardio}
              />
              <AddButton
                onClick={() => {
                  setRoutineRef.current = setCardioRoutine;
                  setTitle("Add Cardio Workout");
                  enableModal();
                }}
                text="Add cardio workout"
              />
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
            title,
            updateRoutineData: (workout) =>
              setRoutineRef.current((curr) => [...curr, workout]),
          }}
        />
      )}
    </>
  );
};
