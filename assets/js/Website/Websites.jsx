import React, { memo, useCallback, useEffect, useState } from "react";
import { WebsitesList } from "./WebsitesList";
import { WebsiteForm } from "./WebsiteForm";
import { useFetch } from "../api/websites_api";

export const Websites = memo(({ user }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [
    successMessageTimeoutHandle,
    setSuccessMessageTimeoutHandle,
  ] = useState(0);

  const {
    load: fetchApi,
    items: websites,
    setItems: setWebsites,
    isLoading,
    count,
    hasMore,
  } = useFetch("/api/websites");

  const handleLoadMore = useCallback(() => {
    let more = true;
    fetchApi(more);
  });

  const handleAddItem = useCallback((website) => {
    setWebsites((websites) => [website, ...websites]);
    displaySuccessMessage("Website saved !");
  }, []);

  const handleUpdateItem = useCallback((newItem, oldItem) => {
    setWebsites((websites) =>
      websites.map((item) => (item === oldItem ? newItem : item))
    );
    displaySuccessMessage("Website updated !");
  }, []);

  const handleDeleteItem = useCallback((item) => {
    setWebsites((websites) => websites.filter((site) => site !== item));
    displaySuccessMessage("Website deleted !");
  }, []);

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
    fetchApi();

    return () => {
      clearTimeout(successMessageTimeoutHandle);
    };
  }, []);

  return (
    <div>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {user && <WebsiteForm onAddItem={handleAddItem} user={user} />}
      <WebsitesList
        user={user}
        websites={websites}
        onLoadMore={handleLoadMore}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
        isLoading={isLoading}
        hasMore={hasMore}
      />
    </div>
  );
});
