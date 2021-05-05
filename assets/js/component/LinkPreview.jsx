import React, { memo } from "react";

const LinkPreview = memo(({ website }) => {
  return (
    <a
      href={website.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-title"
    >
      {website.shortUrl}
    </a>
  );
});

export default LinkPreview;
