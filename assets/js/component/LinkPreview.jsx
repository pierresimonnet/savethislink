import React, { memo } from "react";
import Icon from "./Icon";

const LinkPreview = memo(({ website }) => {
  return (
    <div className="d-flex flex-vertical-centered">
      <Icon id="link" />
      <a
        href={website.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-title"
      >
        {website.shortUrl}
      </a>
    </div>
  );
});

export default LinkPreview;
