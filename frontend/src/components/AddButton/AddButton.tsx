import { Add } from "../../resources/SVG";
import "./add-button.css";
import { AddButtonProps } from "./types";

export const AddButton = ({ onClick, text }: AddButtonProps) => {
  return (
    <div className="add-button" onClick={onClick}>
      <Add fill="white" />
      <span>{text}</span>
    </div>
  );
};
