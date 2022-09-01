import { CSSProperties, useRef, useState } from "react";
import "../style/workout.css";
import YoutubeIcon from "./YoutubeIcon";

interface WorkoutProps {
  workoutName: string;
  numOfSets: number;
  numOfReps: number;
  level: number;
  increase: () => void;
  decrease: () => void;
  unit: string;
  zIndex: number;
  canShow: boolean;
  enable: () => void;
  disable: () => void;
  videoURL?: string;
}

const SHOW_STYLE: CSSProperties = { opacity: 1, top: "0" };
const HIDE_STYLE: CSSProperties = { opacity: 0, top: "100%" };
const HIDE_VIDEO_STYLE: CSSProperties = { height: "0", top: "0" };
const SHOW_VIDEO_STYLE: CSSProperties = { height: "56.25vw", top: "100%" };
const Workout = ({
  workoutName,
  numOfReps,
  numOfSets,
  level,
  increase,
  decrease,
  unit,
  zIndex,
  canShow,
  enable,
  disable,
  videoURL,
}: WorkoutProps) => {
  const isDataReady = level !== undefined;
  const [style, setStyle] = useState<CSSProperties>(HIDE_STYLE);
  const [canPress, setPress] = useState<boolean>(true);
  const [canShowVideo, setShowVideo] = useState<boolean>(false);
  const iidRef = useRef<NodeJS.Timeout>();
  if (!canShow) {
    clearInterval(iidRef.current);
  }
  return (
    <div className="workout-row">
      {videoURL && (
        <div className="youtube-icon-container" style={{ zIndex }}>
          <YoutubeIcon
            onClick={() => {
              if (!canShow) {
                enable();
                iidRef.current = setTimeout(() => setShowVideo(true), 1000);
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
                frameBorder="0"
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
      <div
        className="input-container"
        style={!isDataReady ? { animation: "fading 1.5s infinite" } : {}}
      >
        <div
          draggable={false}
          onPointerDown={() => increase()}
          className="increase-button"
        >
          +
        </div>
        <div
          className="weight-label"
          onPointerDown={() => {
            if (canPress) {
              setPress(false);
              setStyle(SHOW_STYLE);
              setTimeout(() => {
                setStyle(HIDE_STYLE);
                setPress(true);
              }, 2000);
            }
          }}
        >
          {isDataReady && `${level} ${unit}`}
        </div>
        <div onPointerDown={() => decrease()} className="decrease-button">
          -
        </div>
        <div
          className="sets-and-reps-container"
          style={style}
          onPointerDown={() => {
            if (!canPress) {
              setStyle(HIDE_STYLE);
              setPress(true);
            }
          }}
        >
          <div>
            Sets:&nbsp;<span style={{ color: "#f2a25f" }}>{numOfSets}</span>
          </div>
          <div>
            Reps:&nbsp;<span style={{ color: "#dd2a5a" }}>{numOfReps}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;
