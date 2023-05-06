import React, { useRef, useState, CSSProperties, useEffect } from "react";
import { Card } from "../Card";
import {
  times,
  getLeft,
  FUNCTIONS_PATH,
  useSwipe,
  Routine,
  muscleGroups,
  muscleGroup,
  Routines,
  useNavigate,
  isLoggedIn,
  setLoggedIn,
} from "../../misc";
import "./home.css";
import { Logout } from "../../resources/SVG";

export const Home = () => {
  const homepageRef = useRef<HTMLDivElement>(null);
  const cardRefs = times(muscleGroups.length, React.createRef<HTMLDivElement>);
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>();
  const [borderPos, setStyle] = useState("0");
  const [canPress, setPress] = useState(true);
  const navigate = useNavigate();
  const path = window.location.pathname;
  const str = path!.substring(path!.lastIndexOf("/") + 1);
  const i = muscleGroups.indexOf(str as muscleGroup);
  const index = i === -1 ? 0 : i;
  const { curr, startSwipe, moveSwipe, endSwipe } = useSwipe(
    homepageRef,
    cardRefs,
    (i) => navigate(`/musclegroup/${muscleGroups[i]}`),
    index
  );

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
    fetch(`${FUNCTIONS_PATH}/get_gym_routine`, {
      method: "GET",
      credentials: "include",
    })
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
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) return navigate("/login");
    navigate(`/musclegroup/${muscleGroups[index]}`);
  }, [navigate, index]);

  return (
    <main
      ref={homepageRef}
      className="homepage"
      onPointerDown={startSwipe}
      onPointerMove={moveSwipe}
      onPointerUp={endSwipe}
    >
      <button
        className="logout-button"
        onClick={() => {
          setLoggedIn(false);
          fetch(`${FUNCTIONS_PATH}/logout`, {
            mode: "cors",
            credentials: "include",
          }).then(() => navigate("/login"));
        }}
      >
        <Logout fill="#ffffff80" />
      </button>
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
            fetch(`${FUNCTIONS_PATH}/update_gym_routine`, {
              method: "POST",
              mode: "cors",
              credentials: "include",
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
    </main>
  );
};
