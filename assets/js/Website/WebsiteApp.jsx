import React, { useEffect, useState } from "react";
import Websites from "./Websites";
import { getWebsites, deleteWebsite, createWebsite } from "../api/websites_api";

export default function WebsiteApp() {
  const [websites, setWebsites] = useState([]);
  const [highlightedRowId, setHighlightedRowId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSavingNewItem, setIsSavingNewItem] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [
    successMessageTimeoutHandle,
    setSuccessMessageTimeoutHandle,
  ] = useState(0);

  const handleRowClick = (id) => {
    setHighlightedRowId(id);
  };

  const handleAddItem = (url, title, description, comment) => {
    const newWebsite = {
      url,
      title,
      description,
    };
    setIsSavingNewItem(true);

    createWebsite(newWebsite)
      .then((data) => {
        setWebsites((websites) => [data, ...websites]);
        setIsSavingNewItem(false);
        displaySuccessMessage("Website saved !");
      })
      .catch((error) => {
        error.response.json().then((errors) => {
          console.log(errors.violations);
          setIsSavingNewItem(false);
        });
      });
  };

  const handleDeleteItem = (id) => {
    setWebsites((websites) =>
      websites.map((site) => {
        if (site.id !== id) {
          return site;
        }

        return { ...site, isDeleting: true };
      })
    );

    deleteWebsite(id).then(() => {
      setWebsites((websites) => websites.filter((site) => site.id !== id));
      displaySuccessMessage("Website deleted !");
    });
  };

  const displaySuccessMessage = (message) => {
    setSuccessMessage(message);
    clearTimeout(successMessageTimeoutHandle);
    setSuccessMessageTimeoutHandle(
      setTimeout(() => {
        setSuccessMessage("");
        setSuccessMessageTimeoutHandle(0);
      }, 3000)
    );
  };

  useEffect(() => {
    getWebsites().then((data) => {
      setWebsites(data);
      setIsLoaded(true);
    });

    return () => {
      clearTimeout(successMessageTimeoutHandle);
    };
  }, []);

  return (
    <Websites
      websites={websites}
      highlightedRowId={highlightedRowId}
      onRowClick={handleRowClick}
      onAddItem={handleAddItem}
      onDeleteItem={handleDeleteItem}
      isLoaded={isLoaded}
      isSavingNewItem={isSavingNewItem}
      successMessage={successMessage}
    />
  );
}
