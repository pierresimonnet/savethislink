import React, { memo } from "react";
import Icon from "./Icon";

const LinkPreview = memo(({ website }) => {
  return (
    <div>
      <a
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-title d-flex flex-vertical-centered"
      >
        <Icon id="link" />
        <span> {website.shortUrl}</span>
      </a>
    </div>
  );
});

export default LinkPreview;
