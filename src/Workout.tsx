import { useState } from "react";
import "./workout.css";

interface WorkoutProps {
  workoutName: string;
  numOfSets: number;
  numOfReps: number;
  level: number;
  increase: () => void;
  decrease: () => void;
}

const Workout = ({
  workoutName,
  numOfReps,
  numOfSets,
  level,
  increase,
  decrease,
}: WorkoutProps) => {
  const [canPress, setPress] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<number>(0);
  const [top, setTop] = useState<string>("-100%");
  return (
    <div className="workout-row">
      <div
        className="workout-label"
        style={{ cursor: canPress ? "pointer" : "not-allowed" }}
        onClick={() => {
          if (canPress) {
            setPress(false);
            setOpacity(1);
            setTop("133.333%");
            setTimeout(() => {
              setPress(true);
              setOpacity(0);
              setTop("-100%");
            }, 1500);
          }
        }}
      >
        {workoutName}
        <div className="set-info noselect" style={{ opacity, top }}>
          Sets: {numOfSets}
          <br />
          Reps: {numOfReps}
          <div className="triangle"></div>
        </div>
      </div>
      {
        <div className="input-container">
          <div
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            onPointerDown={() => increase()}
            className="increase-button"
          >
            +
          </div>
          <div className="weight-label">{level}</div>
          <div onPointerDown={() => decrease()} className="decrease-button">
            -
          </div>
        </div>
      }
    </div>
  );
};

export default Workout;
