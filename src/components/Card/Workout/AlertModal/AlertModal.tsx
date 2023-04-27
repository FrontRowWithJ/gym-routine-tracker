import { AlertModalProps } from "./types";
import "./alert-modal.css";

export const AlertModal = ({ message, close, callback }: AlertModalProps) => {
  return (
    <div className="alert-modal">
      <div>
        <span>{message}</span>
        <div>
          <button
            type="button"
            onClick={() => {
              callback();
              close();
            }}
          >
            Yes
          </button>
        </div>
        <div>
          <button type="button" onClick={close}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
