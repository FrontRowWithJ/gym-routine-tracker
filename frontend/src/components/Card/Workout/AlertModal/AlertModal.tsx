import { AlertModalProps } from "./types";
import "./alert-modal.css";
import React from "react";

export const AlertModal = ({ message, close, callback }: AlertModalProps) => {
  const closeWrapper = () => {
    setTimeout(close, 1000);
    document
      .querySelector(".alert-modal > div")
      ?.classList.add("reverse-translate");
  };
  return (
    <div className="alert-modal">
      <div>
        <span>{message}</span>
        <div>
          <button
            type="button"
            onClick={() => {
              callback();
              closeWrapper();
            }}
          >
            Yes
          </button>
        </div>
        <div>
          <button type="button" onClick={closeWrapper}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
