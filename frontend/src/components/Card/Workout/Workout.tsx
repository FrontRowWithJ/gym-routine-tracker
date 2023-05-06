import React, { CSSProperties, useRef, useState } from "react";
import "./workout.css";
import { Youtube } from "../../../resources/SVG/Youtube";
import { WorkoutProps } from "./types";
import { Delete } from "../../../resources/SVG";
import { AlertModal } from "./AlertModal";

const SHOW_STYLE: CSSProperties = { opacity: 1, top: "0" };
const HIDE_STYLE: CSSProperties = { opacity: 0, top: "100%" };
const HIDE_VIDEO_STYLE: CSSProperties = { height: "0", top: "0" };
const SHOW_VIDEO_STYLE: CSSProperties = { height: "56.25vw", top: "100%" };

export const Workout = ({
  increase,
  decrease,
  canShow,
  enable,
  disable,
  workout,
  removeWorkout,
}: WorkoutProps) => {
  const { workoutName, numOfReps, numOfSets, unit, videoURL, amount } = workout;
  const [style, setStyle] = useState<CSSProperties>(HIDE_STYLE);
  const [canPress, setPress] = useState<boolean>(true);
  const [canShowVideo, setShowVideo] = useState<boolean>(false);
  const [canShowModal, setShowModal] = useState<boolean>(false);
  const iidRef = useRef<number>();
  if (!canShow) clearInterval(iidRef.current);

  return (
    <>
      {canShowModal && (
        <AlertModal
          message="Are you sure you want to remove this workout?"
          close={() => setShowModal(false)}
          callback={removeWorkout}
        />
      )}
      <div className="workout-row noselect">
        {videoURL && (
          <div className="youtube-icon-container">
            <Youtube
              onClick={() => {
                if (!canShow) {
                  enable();
                  iidRef.current = +setTimeout(() => setShowVideo(true), 1000);
                } else {
                  clearInterval(iidRef.current);
                  setShowVideo(false);
                  disable();
                }
              }}
            />
            <div
              className="youtube-video-container"
              style={canShow ? SHOW_VIDEO_STYLE : HIDE_VIDEO_STYLE}
            >
              {canShowVideo && (
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  src={videoURL}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        )}
        <div className="workout-label">
          <div>{workoutName}</div>
        </div>
        <div className="input-container">
          <div onClick={increase} className="increase-button">
            +
          </div>
          <div
            className="weight-label"
            onPointerDown={() => {
              if (!canPress) return;
              setPress(false);
              setStyle(SHOW_STYLE);
              setTimeout(() => {
                setStyle(HIDE_STYLE);
                setPress(true);
              }, 2000);
            }}
          >
            {`${amount} ${unit}`}
          </div>
          <div onClick={decrease} className="decrease-button">
            -
          </div>
          <div
            className="sets-and-reps-container"
            style={style}
            onPointerDown={() => {
              if (canPress) return;
              setStyle(HIDE_STYLE);
              setPress(true);
            }}
          >
            <div>
              <div>
                Sets:&nbsp;<span style={{ color: "#f2a25f" }}>{numOfSets}</span>
              </div>
              <div>
                Reps:&nbsp;<span style={{ color: "#dd2a5a" }}>{numOfReps}</span>
              </div>
            </div>
            <div className="delete-button" onClick={() => setShowModal(true)}>
              <Delete fill="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
