import "../style/label.css";

interface LabelProp {
  text: string;
  pos: number;
  labelRef: React.RefObject<HTMLDivElement>;
}
const Label = ({ text, pos, labelRef }: LabelProp) => (
  <div ref={labelRef} className={`label-${pos} center`}>
    <div className="line"></div>
    <div className="text center">
      <span className="hidden-text">{`${text}`}</span>
      <span className="shown-text center">{`${text}`}</span>
    </div>
  </div>
);

export default Label;
