import React, { memo } from "react";

const Alert = memo(({ type, message }) => {
  return (
    <div className="alertContainer">
      <div className={`alert alert-${type}`}>{message}</div>
    </div>
  );
});

export default Alert;
