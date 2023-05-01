import { AddWorkoutModalProps } from "./types";
import "./add-workout-modal.css";
import React, { CSSProperties, useRef, useState } from "react";
import { Workout, capitalise, times } from "../../../misc";
import { BackButton, Minus, Plus } from "../../../resources/SVG";

const START_STYLE: CSSProperties = { left: 0, transform: "translateX(0%)" };

const END_STYLE: CSSProperties = {
  left: "100%",
  transform: "translateX(calc(-100% - 6px))",
};

const ENABLED: CSSProperties = { opacity: 1, cursor: "" };

const DISABLED: CSSProperties = { opacity: 0.5, cursor: "not-allowed" };

const ENABLED_ANIMATION: CSSProperties = {
  animationName: "translate",
  animationDuration: "1s",
  animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
};

const DISABLED_ANIMATION: CSSProperties = {
  animationName: "none",
  animationDuration: "unset",
  animationTimingFunction: "unset",
  animationDelay: "0ms",
};

export const AddWorkoutModal = ({
  hasVideo,
  setHasVideo,
  disable,
  updateRoutineData,
}: AddWorkoutModalProps) => {
  const [workoutName, setWorkoutName] = useState<string>("");
  const [numOfSets, setNumOfSets] = useState<number>(0);
  const [numOfReps, setNumOfReps] = useState<number>(0);
  const [unit, setUnit] = useState<Workout["unit"]>("");
  const [unitAmount, setUnitAmount] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const animationOffset = 50;
  const animationDelay = useRef<number>(-animationOffset);
  const [animationState, setAnimationState] = useState<CSSProperties>({
    ...ENABLED_ANIMATION,
    top: "-100px",
    opacity: 0,
  });
  const getAnimationStyle = (): CSSProperties => ({
    animationDelay: `${(animationDelay.current += animationOffset)}ms`,
    ...animationState,
  });

  const [
    workoutNameRef,
    numOfSetsRef,
    numOfRepsRef,
    unitAmountRef,
    videoUrlRef,
  ] = times(5, React.createRef<HTMLInputElement>);

  return (
    <div className="add-modal-container">
      <form className="add-modal-form" action="" autoComplete="off">
        <header>
          <div className="back-button" onClick={disable}>
            <BackButton fill="white" />
          </div>
          <h6 style={{ color: "white" }}>Add Workout</h6>
        </header>

        <div style={getAnimationStyle()}>
          <label htmlFor="workout-name">Workout Name</label>
          <div>
            <input
              ref={workoutNameRef}
              value={workoutName}
              onChange={({ target: { value } }) => setWorkoutName(value)}
              required
              inputMode="text"
              lang="en"
              pattern="^[a-zA-Z0-9]{3,}[a-zA-Z0-9 ]*$"
              title="Please enter a valid workout name"
              tabIndex={0}
              type="text"
              name="workout-name"
            />
          </div>
        </div>

        <div style={getAnimationStyle()}>
          <label htmlFor="number-of-sets">Number of Sets</label>
          <div>
            <input
              ref={numOfSetsRef}
              value={numOfSets}
              onChange={({ target: { value } }) =>
                setNumOfSets((curr) => (isNaN(+value) ? curr : +value))
              }
              required
              inputMode="numeric"
              lang="en"
              pattern="^[1-9]\d*$"
              title="Please enter a valid number of sets"
              tabIndex={0}
              type="text"
              name="number-of-sets"
            />
          </div>
        </div>
        <div style={getAnimationStyle()}>
          <label htmlFor="number-of-reps">Number of Reps per Set</label>
          <div>
            <input
              ref={numOfRepsRef}
              value={numOfReps}
              onChange={({ target: { value } }) =>
                setNumOfReps((curr) => (isNaN(+value) ? curr : +value))
              }
              required
              inputMode="numeric"
              lang="en"
              pattern="^[1-9]\d*$"
              title="Please enter a valid number of reps"
              tabIndex={0}
              type="text"
              name="number-of-reps"
            />
          </div>
        </div>

        <fieldset className="radio-button-fieldset" style={getAnimationStyle()}>
          <legend>Select a Unit:</legend>
          {(["", "kg", "s", "mins"] as const).map((_unit) => (
            <div key={_unit}>
              <div
                className="radio-button"
                style={{
                  backgroundColor:
                    unit === _unit ? "rgba(29, 180, 150, 1)" : "white",
                }}
                id={_unit}
                onClick={() => setUnit(_unit)}
              ></div>
              <label
                htmlFor={_unit}
                style={{
                  color: unit === _unit ? "rgba(29, 180, 150, .8)" : "",
                }}
              >
                {capitalise(_unit) || "None"}
              </label>
            </div>
          ))}
        </fieldset>

        <div style={getAnimationStyle()}>
          <label htmlFor="unit-amount">Unit Amount</label>
          <div>
            <input
              ref={unitAmountRef}
              value={unitAmount}
              onChange={({ target: { value } }) => {
                setUnitAmount((curr) => (isNaN(+value) ? curr : +value));
                setAmount(0);
              }}
              required
              inputMode="numeric"
              lang="en"
              pattern="^[1-9]\d*$"
              title="Please enter a valid unit amount"
              tabIndex={0}
              type="text"
              name="unit-amount"
            />
          </div>
        </div>

        <div style={getAnimationStyle()}>
          <label htmlFor="amount">Amount</label>
          <div className="amount-wrapper">
            <div>
              <button
                type="button"
                onClick={() => setAmount((curr) => curr + unitAmount)}
              >
                <Plus fill="white" />
              </button>
            </div>
            <span>{amount}</span>
            <div>
              <button
                type="button"
                onClick={() =>
                  setAmount((curr) => Math.max(0, curr - unitAmount))
                }
              >
                <Minus fill="white" />
              </button>
            </div>
          </div>
        </div>

        <fieldset className="checkbox-fieldset" style={getAnimationStyle()}>
          <div
            className="checkbox"
            style={{ backgroundColor: hasVideo ? "rgba(29, 180, 150, 1)" : "" }}
            onClick={() => setHasVideo((hasVideo) => !hasVideo)}
          >
            <div
              className="switch"
              style={hasVideo ? END_STYLE : START_STYLE}
            ></div>
          </div>
          <span className="checkbox-text">Has Video Tutorial?</span>
        </fieldset>

        <div style={getAnimationStyle()}>
          <label htmlFor="video-url" style={hasVideo ? ENABLED : DISABLED}>
            Youtube URL
          </label>
          <div style={hasVideo ? ENABLED : DISABLED}>
            <input
              ref={videoUrlRef}
              className="video-url"
              value={videoUrl}
              onChange={({ target: { value } }) => setVideoUrl(value)}
              inputMode="url"
              lang="en"
              pattern="https://www.youtube.com/embed/[a-zA-Z0-9]+"
              title="Please enter a valid youtube url"
              required={hasVideo}
              tabIndex={0}
              disabled={!hasVideo}
              type="text"
              name="video-url"
            />
          </div>
        </div>

        <button
          style={getAnimationStyle()}
          onAnimationEnd={() =>
            setAnimationState({ ...DISABLED_ANIMATION, opacity: 1, top: 0 })
          }
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            if (!workoutNameRef.current?.checkValidity())
              return workoutNameRef.current?.reportValidity();
            if (!numOfSetsRef.current?.checkValidity())
              return numOfSetsRef.current?.reportValidity();
            if (!numOfRepsRef.current?.checkValidity())
              return numOfRepsRef.current?.reportValidity();
            if (!unitAmountRef.current?.checkValidity())
              return unitAmountRef.current?.reportValidity();
            if (!videoUrlRef.current?.checkValidity()) {
              return videoUrlRef.current?.reportValidity();
            }
            const videoURL = hasVideo
              ? (videoUrl as `https://www.youtube.com/embed/${string}`)
              : "";
            const workout: Workout = {
              workoutName,
              numOfSets,
              numOfReps,
              unit,
              unitAmount,
              videoURL,
              amount: 0,
            };
            updateRoutineData(workout);
            disable();
          }}
        >
          Add Workout
        </button>
      </form>
    </div>
  );
};
