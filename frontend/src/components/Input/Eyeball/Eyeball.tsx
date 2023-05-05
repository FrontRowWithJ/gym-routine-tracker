import { Show, Hide } from "../../../resources/SVG";
import { EyeballProps } from "./types";

export const Eyeball = ({ open, fill, onClick, className }: EyeballProps) => {
  const Eye = open ? Show : Hide;
  return <Eye {...{ fill, onClick, className }} />;
};
