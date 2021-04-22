import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isShowing, hide, title, children }) => {
  if (isShowing) {
    return createPortal(
      <>
        <div
          className="modal"
          style={{ position: "absolute", top: 0, backgroundColor: "#c8c8c8" }}
        >
          <button type="button" onClick={hide}>
            Close
          </button>
          <div>
            <h3>{title}</h3>
            <div>{children}</div>
          </div>
        </div>
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default Modal;
