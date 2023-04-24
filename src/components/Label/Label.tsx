import "./label.css";
import { LabelProps } from "./types";

export const Label = ({ text, pos, labelRef }: LabelProps) => (
  <div ref={labelRef} className={`label-${pos} center`}>
    <div className="line"></div>
    <div className="text center">
      <span className="hidden-text">{`${text}`}</span>
      <span className="shown-text center">{`${text}`}</span>
    </div>
  </div>
);

