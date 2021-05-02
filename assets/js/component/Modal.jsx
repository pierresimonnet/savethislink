import React from "react";
import { createPortal } from "react-dom";

const modal = ({ isShowing, hide, title, children }) => {
  return isShowing
    ? createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <h4>{title}</h4>
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">{children}</div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
};

export default modal;
