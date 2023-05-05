import { HTMLInputTypeAttribute } from "react";
import { SVGProp } from "../../resources/SVG/SVGTypes";

export interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundColor: string;
  className?: string;
  focusColor: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  Icon?: (props: SVGProp) => JSX.Element;
  pattern?: string;
  errorMessage?: string | undefined;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | undefined>>;
  inputRef?: React.RefObject<HTMLInputElement>;
}
