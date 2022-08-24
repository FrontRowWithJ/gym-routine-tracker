import "./label.css";

type LabelProp = { bar: string; text: string; pos: number };
const Label = ({ bar, text, pos }: LabelProp) => (
  <div className={`label-${pos}`}>{`${bar} ${text} ${bar}`}</div>
);

export default Label;
