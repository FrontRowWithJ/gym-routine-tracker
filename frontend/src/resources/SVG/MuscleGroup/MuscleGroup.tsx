import { muscleGroup } from "../../../misc";
import { SVGProp } from "../SVGTypes";
import { MuscleGroupPaths } from "./Paths";

type MuscleGroupProps = { muscleGroup: muscleGroup } & SVGProp;

export const MuscleGroup = (props: MuscleGroupProps) => {
  return (
    <svg
      style={props.style}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="128 128 496 496"
      preserveAspectRatio="xMidYMid meet"
      className="muscle-group-icon"
    >
      <defs>
        <linearGradient id="muscle-group">
          <stop offset="0%" stopColor={props.startColor}></stop>
          <stop offset="100%" stopColor={props.stopColor}></stop>
        </linearGradient>
      </defs>
      <g
        transform={
          props.muscleGroup === "shoulder"
            ? "translate(120,631.777777778) scale(0.100000,-0.100000)"
            : ""
        }
        fill="url('#muscle-group')"
      >
        {MuscleGroupPaths[props.muscleGroup]()}
      </g>
    </svg>
  );
};
