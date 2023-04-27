import React, { useRef, useState, CSSProperties, useEffect } from "react";
import { Card } from "../Card";
import {
  times,
  getLeft,
  BASE_URL,
  useSwipe,
  Routine,
  muscleGroups,
  muscleGroup,
  Routines,
} from "../../misc";
import "./app.css";

const App = () => {
  const appRef = useRef<HTMLDivElement>(null);
  const cardRefs = times(muscleGroups.length, React.createRef<HTMLDivElement>);

  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>();
  const [borderPos, setStyle] = useState("0");
  const [canPress, setPress] = useState(true);
  const { curr, startSwipe, moveSwipe, endSwipe } = useSwipe(cardRefs, appRef);

  const [chestRoutine, setChestRoutine] = useState<Routine>([]);
  const [backRoutine, setBackRoutine] = useState<Routine>([]);
  const [shoulderRoutine, setShoulderRoutine] = useState<Routine>([]);
  const [legRoutine, setLegRoutine] = useState<Routine>([]);
  const [armRoutine, setArmRoutine] = useState<Routine>([]);
  const [cardioRoutine, setCardioRoutine] = useState<Routine>([]);
  const [absRoutine, setAbsRoutine] = useState<Routine>([]);

  const routines: {
    [key in muscleGroup | "cardio" | "abs"]: Routine;
  } = {
    chest: chestRoutine,
    back: backRoutine,
    shoulder: shoulderRoutine,
    leg: legRoutine,
    arm: armRoutine,
    cardio: cardioRoutine,
    abs: absRoutine,
  };
  const setRoutines: {
    [key in muscleGroup | "cardio" | "abs"]: React.Dispatch<
      React.SetStateAction<Routine>
    >;
  } = {
    chest: setChestRoutine,
    back: setBackRoutine,
    shoulder: setShoulderRoutine,
    leg: setLegRoutine,
    arm: setArmRoutine,
    cardio: setCardioRoutine,
    abs: setAbsRoutine,
  };

  useEffect(() => {
    fetch(`${BASE_URL}/get_gym_routine`)
      .then(async (response) => (await response.json()) as Routines)
      .then((routine) => {
        setChestRoutine(routine["chest"]);
        setBackRoutine(routine["back"]);
        setShoulderRoutine(routine["shoulder"]);
        setLegRoutine(routine["leg"]);
        setArmRoutine(routine["arm"]);
        setCardioRoutine(routine["cardio"]);
        setAbsRoutine(routine["abs"]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={appRef}
      className="app"
      onPointerDown={startSwipe}
      onPointerMove={moveSwipe}
      onPointerUp={endSwipe}
    >
      {muscleGroups.map((muscleGroup, i) => (
        <Card
          cardRef={cardRefs[i]}
          style={{ left: getLeft(i, curr) }}
          key={muscleGroup}
          muscleGroup={muscleGroup}
          muscleGroupRoutine={routines[muscleGroup]}
          setMuscleGroupRoutine={setRoutines[muscleGroup]}
          setAbsRoutine={setAbsRoutine}
          setCardioRoutine={setCardioRoutine}
          cardioRoutine={routines["cardio"]}
          absRoutine={routines["abs"]}
        />
      ))}
      <div className="save-container">
        <div
          className="save-button noselect"
          onPointerDown={() => {
            if (!canPress) return;
            setPress(false);
            setStyle("calc(100% - 2px)");
            if (!routines) return;
            fetch(`${BASE_URL}/update_gym_routine`, {
              method: "POST",
              mode: "cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(routines),
            }).then(({ status, body }) => {
              if (status === 200) {
                setPress(true);
                setIndicatorStyle({ opacity: 1, bottom: "4.5rem" });
                setTimeout(() => {
                  setIndicatorStyle({});
                  setStyle("0");
                }, 1000);
              } else console.error(body);
            });
          }}
        >
          S&nbsp;&nbsp;A&nbsp;&nbsp;V&nbsp;&nbsp;E
          <div id="top-border" style={{ top: borderPos }}></div>
          <div id="bottom-border" style={{ bottom: borderPos }}></div>
          <div id="left-border"></div>
          <div id="right-border"></div>
        </div>
        <div className="save-indicator" style={indicatorStyle}>
          Saved!
        </div>
      </div>
    </div>
  );
};
export default App;
