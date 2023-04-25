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
} from "../../misc";
import "./app.css";

const App = () => {
  const [chestData, setChestData] = useState<number[]>([]);
  const [backData, setBackData] = useState<number[]>([]);
  const [shoulderData, setShoulderData] = useState<number[]>([]);
  const [legData, setLegData] = useState<number[]>([]);
  const [armsData, setArmsData] = useState<number[]>([]);
  const [cardioData, setCardioData] = useState<number[]>([]);
  const [absData, setAbsData] = useState<number[]>([]);
  const [workout, setWorkout] = useState<Routine>();
  const appRef = useRef<HTMLDivElement>(null);
  const cardRefs = times(muscleGroups.length, React.createRef<HTMLDivElement>);

  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>();
  const [borderPos, setStyle] = useState("0");
  const [canPress, setPress] = useState(true);
  const { curr, startSwipe, moveSwipe, endSwipe } = useSwipe(cardRefs, appRef);

  const [chestRoutine, setChestRoutine] = useState<Routine["chest"]>([]);
  const [backRoutine, setBackRoutine] = useState<Routine["back"]>([]);
  const [shoulderRoutine, setShoulderRoutine] = useState<Routine["shoulder"]>(
    []
  );
  const [legRoutine, setLegRoutine] = useState<Routine["leg"]>([]);
  const [armRoutine, setArmRoutine] = useState<Routine["arm"]>([]);
  const [cardioRoutine, setCardioRoutine] = useState<Routine["cardio"]>([]);
  const [absRoutine, setAbsRoutine] = useState<Routine["abs"]>([]);

  const dataArrays: {
    [key in muscleGroup | "cardio" | "abs"]: number[];
  } = {
    chest: chestData,
    back: backData,
    shoulder: shoulderData,
    leg: legData,
    arm: armsData,
    cardio: cardioData,
    abs: absData,
  };
  const setDatas: {
    [key in muscleGroup | "cardio" | "abs"]: React.Dispatch<
      React.SetStateAction<number[]>
    >;
  } = {
    chest: setChestData,
    back: setBackData,
    shoulder: setShoulderData,
    leg: setLegData,
    arm: setArmsData,
    cardio: setCardioData,
    abs: setAbsData,
  };

  const routines: {
    [key in muscleGroup | "cardio" | "abs"]: Routine[key];
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
      React.SetStateAction<Routine[key]>
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
      .then(async (response) => (await response.json()) as Routine)
      .then((routine) => {
        setChestData(routine["chest"].map(({ amount }) => amount));
        setBackData(routine["back"].map(({ amount }) => amount));
        setShoulderData(routine["shoulder"].map(({ amount }) => amount));
        setLegData(routine["leg"].map(({ amount }) => amount));
        setArmsData(routine["arm"].map(({ amount }) => amount));
        setCardioData(routine["cardio"].map(({ amount }) => amount));
        setAbsData(routine["abs"].map(({ amount }) => amount));
        setWorkout(routine);

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
      {workout &&
        muscleGroups.map((muscleGroup, i) => (
          <Card
            cardRef={cardRefs[i]}
            style={{ left: getLeft(i, curr) }}
            key={muscleGroup}
            {...{ muscleGroup, cardioData, absData }}
            routineData={dataArrays[muscleGroup]}
            setRoutineData={setDatas[muscleGroup]}
            muscleGroupRoutine={routines[muscleGroup]}
            setMuscleGroupRoutine={setRoutines[muscleGroup]}
            cardioRoutine={workout["cardio"]}
            absRoutine={workout["abs"]}
            setCardioData={setCardioData}
            setAbsData={setAbsData}
          />
        ))}
      <div className="save-container">
        <div
          className="save-button noselect"
          onPointerDown={() => {
            if (canPress) {
              setPress(false);
              setStyle("calc(100% - 2px)");
              if (!workout) return;
              const data = structuredClone(workout);
              for (const group of [...muscleGroups, "cardio", "abs"] as const) {
                data[group] = workout[group].map(({ amount, ...rest }, i) => ({
                  ...rest,
                  amount: dataArrays[group][i],
                }));
              }
              fetch(`${BASE_URL}/update_gym_routine`, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
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
            }
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
