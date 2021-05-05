import React, { memo } from "react";

const LinkPreview = memo(({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-title"
    >
      {url}
    </a>
  );
});

export default LinkPreview;
