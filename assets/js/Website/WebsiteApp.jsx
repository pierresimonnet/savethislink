import React, { useEffect, useState } from "react";
import Websites from "./Websites";
import { getWebsites, deleteWebsite, createWebsite } from "../api/websites_api";

export default function WebsiteApp() {
  const [websites, setWebsites] = useState([]);
  const [highlightedRowId, setHighlightedRowId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleRowClick = (id) => {
    setHighlightedRowId(id);
  };

  const handleAddItem = (url, title, description, comment) => {
    const newWebsite = {
      url,
      title,
      description,
      image: "TODO",
      comment,
    };
    createWebsite(newWebsite).then((data) => {
      console.log(data);
      setWebsites((websites) => [...websites, data]);
    });
  };

  const handleDeleteItem = (id) => {
    deleteWebsite(id);
    setWebsites((websites) => websites.filter((site) => site.id !== id));
  };

  useEffect(() => {
    getWebsites().then((data) => {
      setWebsites(data);
      setIsLoaded(true);
    });
  }, []);

  return (
    <Websites
      websites={websites}
      highlightedRowId={highlightedRowId}
      onRowClick={handleRowClick}
      onAddItem={handleAddItem}
      onDeleteItem={handleDeleteItem}
      isLoaded={isLoaded}
    />
  );
}
