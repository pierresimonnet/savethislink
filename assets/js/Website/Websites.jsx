import React, { memo, useCallback, useEffect, useState } from "react";
import { WebsitesList } from "./WebsitesList";
import { WebsiteForm } from "./WebsiteForm";
import { useFetch } from "../api/websites_api";
import useModal from "../component/useModal";
import Modal from "../component/modal";

export const Websites = memo(({}) => {
  const { isShowing, toggle } = useModal();
  const [highlightedRowId, setHighlightedRowId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [
    successMessageTimeoutHandle,
    setSuccessMessageTimeoutHandle,
  ] = useState(0);

  const {
    load: fetchApi,
    items: websites,
    setItems: setWebsites,
    isLoaded,
    count,
    hasMore,
  } = useFetch("/api/websites");

  const handleRowClick = (id) => {
    setHighlightedRowId(id);
  };

  const handleLoadMore = useCallback(() => {
    let more = true;
    fetchApi(more);
  });

  const handleAddItem = (website) => {
    setWebsites((websites) => [...websites, website]);
    displaySuccessMessage("Website saved !");
  };

  const handleDeleteItem = (item) => {
    setWebsites((websites) => websites.filter((site) => site !== item));
    displaySuccessMessage("Website deleted !");
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
      <div>
        <button onClick={toggle}>New</button>
        <Modal isShowing={isShowing} hide={toggle} title="Create a new entry">
          <WebsiteForm onAddItem={handleAddItem} />
        </Modal>
      </div>
      <WebsitesList
        websites={websites}
        highlightedRowId={highlightedRowId}
        onLoadMore={handleLoadMore}
        onRowClick={handleRowClick}
        onDeleteItem={handleDeleteItem}
        isLoaded={isLoaded}
        hasMore={hasMore}
      />
    </div>
  );
});
