import { useState, PointerEvent } from "react";
import { times } from "./util";

const translate = <TElement extends HTMLElement>(e: TElement, d: number) =>
  e && (e.style.left = d + "px");

export const useSwipe = <TElement extends HTMLElement>(
  childRefs: React.RefObject<TElement>[],
  parentRef: React.RefObject<TElement>
) => {
  const [start, setStart] = useState<{ x: number; y: number; t: number }>();
  const [delta, setDelta] = useState<{ x: number; y: number }>();
  const [curr, setCurr] = useState<number>(0);
  const [isScrolling, setScrolling] = useState<boolean>();

  const startSwipe = ({
    pageX: x,
    pageY: y,
    isPrimary,
  }: PointerEvent<TElement>) => {
    if (!isPrimary) return;
    setStart({ x, y, t: +new Date() });
  };

  const moveSwipe = ({ pageX, pageY, isPrimary }: PointerEvent<TElement>) => {
    if (!start) return;
    if (!isPrimary) return;
    const d = { x: pageX - start.x, y: pageY - start.y };
    setDelta(d);
    const [l, m, r] = [-1, 0, 1].map((i) => childRefs[curr + i]?.current);
    if (!parentRef.current) return;
    const w = parentRef.current.clientWidth;
    if (isScrolling === undefined)
      setScrolling(!!(isScrolling || Math.abs(d.x) < Math.abs(d.y)));
    if (isScrolling) return;
    childRefs.forEach(
      (ref) => ref.current && (ref.current.style.transitionDuration = "0ms")
    );
    [l, m, r].forEach((e, i) => {
      const onEdge =
        (curr === childRefs.length - 1 && d.x < 0) || (curr === 0 && d.x > 0);
      e && translate(e, [-w, 0, w][i] + d.x / (onEdge ? 10 : 1));
    });
  };

  const endSwipe = ({ isPrimary }: PointerEvent) => {
    if (!isPrimary || !start) return;
    if (!delta) {
      setStart(undefined);
      return setScrolling(undefined);
    }
    childRefs.forEach(
      (ref) => ref.current && (ref.current.style.transitionDuration = "")
    );
    if (parentRef.current) {
      const w = parentRef.current.clientWidth;
      const duration = +new Date() - start.t;
      const absX = Math.abs(delta.x);
      const isValidSwipe = (duration < 250 && absX > 20) || absX > w / 2;
      const l = curr ? childRefs[curr - 1].current : undefined;
      const m = childRefs[curr].current;
      const r = curr !== 4 ? childRefs[curr + 1].current : undefined;
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

  return { startSwipe, moveSwipe, endSwipe, curr };
};

export const useToggle = (length: number) => {
  const [array, setArray] = useState<boolean[]>(times(length, false));
  const disable = () => setArray(times(length, false));
  const enable = (i: number) => setArray(array.map((b, j) => i === j || b));
  return [array, enable, disable] as const;
};

export const useData = (data?: number[]) => {
  const [arr, set] = useState<number[]>(data ?? []);
  const setArr = (arr: number[]) => {
    arr.forEach((n, i) => n < 0 && (arr[i] = 0));
    set(arr);
  };
  return [arr, setArr] as const;
};