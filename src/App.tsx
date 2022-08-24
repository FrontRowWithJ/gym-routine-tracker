import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import workout, { muscleGroups } from "./workoutData";
import { backend_uri, times, translate, getLeft } from "./util";
import "./app.css";

type TouchEvent = React.TouchEvent<HTMLDivElement>;
type MouseEvent = React.MouseEvent<HTMLDivElement>;
type Event = TouchEvent | MouseEvent;

const isTouchEvent = (event: Event) => !/[Mm]ouse/i.test(event.type);

const getEvent = (event: Event) =>
  isTouchEvent(event)
    ? (event as TouchEvent).touches[0]
    : (event as MouseEvent);

const isPinching = (event: TouchEvent) => event.touches.length > 1;

const App = () => {
  const [chestData, setChestData] = useState<number[]>();
  const [backData, setBackData] = useState<number[]>();
  const [shoulderData, setShoulderData] = useState<number[]>();
  const [legData, setLegData] = useState<number[]>();
  const [armsData, setArmsData] = useState<number[]>();
  const appRef = useRef<HTMLDivElement>(null);
  const cardRefs = times(muscleGroups.length, React.createRef<HTMLDivElement>);
  const [start, setStart] = useState<{ x: number; y: number; t: number }>();
  const [delta, setDelta] = useState<{ x: number; y: number }>();
  const [curr, setCurr] = useState<number>(0);
  const [isScrolling, setScrolling] = useState<boolean>();

  const startSwipe = (evt: Event) => {
    const { pageX, pageY } = getEvent(evt);
    setStart({ x: pageX, y: pageY, t: +new Date() });
  };

  const moveSwipe = (evt: Event) => {
    if (!start) return;
    if (isTouchEvent(evt) && isPinching(evt as TouchEvent)) return;
    const { pageX, pageY } = getEvent(evt);
    const d = { x: pageX - start.x, y: pageY - start.y };
    setDelta(d);
    const [l, m, r] = [-1, 0, 1].map((i) => cardRefs[curr + i]?.current);
    if (appRef.current) {
      const w = appRef.current.clientWidth;
      if (isScrolling === undefined)
        setScrolling(!!(isScrolling || Math.abs(d.x) < Math.abs(d.y)));
      if (!isScrolling) {
        cardRefs.forEach(
          (ref) => ref.current && (ref.current.style.transitionDuration = "0ms")
        );
        [l, m, r].forEach((e, i) => e && translate(e, [-w, 0, w][i] + d.x));
      }
    }
  };

  const endSwipe = () => {
    if (!start) return;
    if (!delta) {
      setStart(undefined);
      setScrolling(undefined);
      return;
    }
    cardRefs.forEach(
      (ref) => ref.current && (ref.current.style.transitionDuration = "")
    );
    if (appRef.current && delta) {
      const w = appRef.current.clientWidth;
      const duration = +new Date() - start.t;
      const absX = Math.abs(delta.x);
      const isValidSwipe = (duration < 250 && absX > 20) || absX > w / 2;
      const l = curr ? cardRefs[curr - 1].current : undefined;
      const m = cardRefs[curr].current;
      const r = curr !== 4 ? cardRefs[curr + 1].current : undefined;
      if (!isScrolling) {
        if (isValidSwipe) {
          const direction = absX / delta.x;
          const pos =
            direction < 0
              ? [2 * -w, +(curr !== 4) * -w, 0]
              : [0, +(curr !== 0) * w, 2 * w];
          [l, m, r].forEach((e, i) => e && translate(e, pos[i]));
          const newCurr =
            direction < 0 ? (r ? curr + 1 : curr) : l ? curr - 1 : curr;
          setCurr(newCurr);
        } else [l, m, r].forEach((e, i) => e && translate(e, [-w, 0, w][i]));
      }
      setDelta(undefined);
      setStart(undefined);
      setScrolling(undefined);
    }
  };

  useEffect(() => {
    (async () => {
      const result = await (await fetch(backend_uri)).json();
      setChestData(result["chest"]);
      setBackData(result["back"]);
      setShoulderData(result["shoulder"]);
      setLegData(result["leg"]);
      setArmsData(result["arms"]);
    })();
  }, []);
  const dataArr = [chestData, backData, shoulderData, legData, armsData];
  const setDataArr = [
    setChestData,
    setBackData,
    setShoulderData,
    setLegData,
    setArmsData,
  ];
  return (
    <div
      ref={appRef}
      className="app"
      onMouseDown={startSwipe}
      onMouseMove={moveSwipe}
      onMouseUp={endSwipe}
      onTouchStart={startSwipe}
      onTouchMove={moveSwipe}
      onTouchEnd={endSwipe}
      onContextMenu={(evt) => {
        evt.stopPropagation();
        evt.preventDefault();
      }}
    >
      {muscleGroups.map((muscleGroup, i) => (
        <Card
          cardRef={cardRefs[i]}
          style={{ left: getLeft(i, curr) }}
          key={muscleGroup}
          muscleGroup={muscleGroup}
          routine={workout[muscleGroup]}
          data={dataArr[i]}
          setData={setDataArr[i]}
        />
      ))}
    </div>
  );
};
export default App;
