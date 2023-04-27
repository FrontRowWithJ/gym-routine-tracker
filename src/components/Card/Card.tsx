import "./card.css";
import React, { useRef, useState } from "react";
import { Label } from "./Label";
import { IconPicker } from "./IconPicker";
import { times, useToggle } from "../../misc";
import { CardProp } from "./types";
import { Add } from "../../resources/SVG";
import { AddWorkoutModal } from "./AddWorkoutModal";
import { Routine } from "./Routine";

const startColors = ["#ffa500", "#227e22", "#f83600"] as const;
const stopColors = ["yellow", "#66ff00", "#ee812b"] as const;
const HEIGHT_OF_SPACER_IN_PX = 176; // 11rem

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
              if (!node) return;
              const { y: parentY } = currentTarget.getBoundingClientRect();
              const arr = labelRefs.map(({ current: label }) =>
                Math.abs((label?.getBoundingClientRect().y as number) - parentY)
              );
              const min = Math.min(...arr);
              const minIndex = arr.findIndex((n) => n === min);
              const startColor = startColors[minIndex];
              const stopColor = stopColors[minIndex];
              setColors({ startColor, stopColor });
            }}
          >
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
              <div className="add-button" onClick={enableModal}>
                <Add fill="white" />
              </div>
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
            updateRoutineData: (workout) =>
              setMuscleGroupRoutine((curr) => [...curr, workout]),
          }}
        />
      )}
    </>
  );
};
