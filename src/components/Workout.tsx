import { CSSProperties, useState } from "react";
import "../style/workout.css";

interface WorkoutProps {
  workoutName: string;
  numOfSets: number;
  numOfReps: number;
  level: number | undefined;
  increase: () => void;
  decrease: () => void;
  unit: string;
}

const SHOW_STYLE: CSSProperties = { opacity: 1, top: "0" };
const HIDE_STYLE: CSSProperties = { opacity: 0, top: "100%" };

const Workout = ({
  workoutName,
  numOfReps,
  numOfSets,
  level,
  increase,
  decrease,
  unit,
}: WorkoutProps) => {
  const isDataReady = level !== undefined;
  const [style, setStyle] = useState<CSSProperties>(HIDE_STYLE);
  const [canPress, setPress] = useState<boolean>(true);
  return (
    <div className="workout-row">
      <div className="workout-label">{workoutName}</div>
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
              }, 1500);
            }
          }}
        >
          {isDataReady && `${level} ${unit}`}
        </div>
        <div onPointerDown={() => decrease()} className="decrease-button">
          -
        </div>
        <div
          className="test"
          style={style}
          onPointerDown={() => {
            if (!canPress) {
              setStyle(HIDE_STYLE);
              setPress(true);
            }
          }}
        >
          <div>
            Sets: &nbsp;<span style={{ color: "#f2a25f" }}>{numOfSets}</span>
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
