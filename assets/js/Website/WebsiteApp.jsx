import React, { useState } from "react";
import Websites from "./Websites";

export default function WebsiteApp() {
  const [websites, setWebsites] = useState([
    {
      id: 1,
      url: "string",
      title: "string",
      description: "string",
      image: "string",
      comment: "string",
    },
  ]);
  const [highlightedRowId, setHighlightedRowId] = useState(null);

  const handleRowClick = (id) => {
    setHighlightedRowId(id);
  };

  const handleAddItem = (url, title, description, comment) => {
    const newWebsite = {
      id: "TODO",
      url,
      title,
      description,
      image: "TODO",
      comment,
    };
    setWebsites((websites) => [...websites, newWebsite]);
  };

  const handleDeleteItem = (id) => {
    setWebsites((websites) => websites.filter((site) => site.id !== id));
  };

  return (
    <Websites
      websites={websites}
      highlightedRowId={highlightedRowId}
      onRowClick={handleRowClick}
      onAddItem={handleAddItem}
      onDeleteItem={handleDeleteItem}
    />
  );
}
