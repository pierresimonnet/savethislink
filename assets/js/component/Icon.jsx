import React from "react";
import sprite from "../../../public/sprite.svg";

const Icon = ({ id }) => {
  return (
    <svg
      className={`icon icon-${id}`}
      width="24"
      height="24"
      aria-hidden="true"
    >
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;
