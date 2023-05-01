import { InputProps } from "./types";
import "./input.css";
import { useEffect, useRef, useState, CSSProperties } from "react";
import { Eyeball } from "./Eyeball";

type foo = { [key in keyof CSSProperties]: string };

interface Keyframe extends foo {}

const KEYFRAMES: Keyframe[] = [
  { transform: "translateX(8px)" },
  { transform: "translateX(-8px)" },
  { transform: "translateX(8px)" },
];

declare var KeyframeEffect: {
  prototype: KeyframeEffect;
  new (
    target: Element | null,
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeEffectOptions
  ): KeyframeEffect;
  new (source: KeyframeEffect): KeyframeEffect;
};

export const Input = ({
  placeholder,
  backgroundColor,
  className,
  value,
  onChange,
  focusColor,
  required,
  type = "text",
  Icon,
  pattern,
  errorMessage,
  setErrorMessage,
  inputRef,
}: InputProps) => {
  const [isEyeOpen, setEyeOpen] = useState<boolean>(false);
  const [_type, setType] = useState<string>(type);
  const [isFocused, setFocused] = useState<boolean>(false);

  const FOCUSED_STYLE = { borderRadius: "0", borderColor: focusColor };
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const errorMessageRef = useRef<string | undefined>(errorMessage);
  useEffect(() => {
    const { current } = inputWrapperRef;
    if (!current || errorMessage === "") return;
    if (errorMessage === undefined)
      return (errorMessageRef.current = undefined);
    errorMessageRef.current = errorMessage;
    setErrorMessage && setErrorMessage("");
    const keyframeEffect = new KeyframeEffect(current, KEYFRAMES, {
      duration: 300,
      iterations: 1,
    });
    const errorAnimation = new Animation(keyframeEffect, document.timeline);
    errorAnimation.play();
  }, [errorMessage, setErrorMessage]);

  return (
    <div
      ref={inputWrapperRef}
      className={`input-wrapper ${className}`}
      style={isFocused ? FOCUSED_STYLE : {}}
      onClick={({ target }) => {
        const { nodeName } = target as HTMLElement;
        if (
          (nodeName === "svg" || nodeName === "path" || nodeName === "INPUT") &&
          type === "password"
        )
          return;
        inputRef?.current?.focus();
      }}
    >
      <input
        type={_type}
        {...{ required, value, onChange, className }}
        onFocus={() => setFocused(true)}
        onBlur={() => !value && setFocused(false)}
        pattern={pattern}
        ref={inputRef}
      />
      <span
        style={{ backgroundColor, color: isFocused ? focusColor : "" }}
        className="input-placeholder"
      >
        {placeholder}
      </span>
      {type === "password" ? (
        <Eyeball
          open={isEyeOpen}
          fill={isFocused ? focusColor : "black"}
          className="eyeball"
          onClick={() => {
            setEyeOpen(!isEyeOpen);
            setType(_type === "password" ? "text" : "password");
          }}
        />
      ) : (
        Icon && <Icon fill={isFocused ? focusColor : "black"} />
      )}
      <span>{errorMessageRef.current}</span>
    </div>
  );
};
