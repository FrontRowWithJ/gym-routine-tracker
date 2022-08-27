import "./label.css";

type LabelProp = { text: string; pos: number };
const Label = ({ text, pos }: LabelProp) => (
  <div className={`label-${pos} center`}>
    <div className="line"></div>
    <div className="text center">
      <span className="hidden-text">{`${text}`}</span>
      <span className="shown-text center">{`${text}`}</span>
    </div>
  </div>
);

export default Label;
