import React, { useCallback, useEffect, useState } from "react";
import FormModal from "../component/FormModal";
import { useFetch } from "../api/websites_api";
import { Alert } from "reactstrap";
import ItemList from "./ItemList";

const ItemApp = ({ user }) => {
  const [modal, setModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [
    successMessageTimeoutHandle,
    setSuccessMessageTimeoutHandle,
  ] = useState(0);
  const {
    load: fetchApi,
    items,
    setItems,
    isLoading,
    count,
    hasMore,
  } = useFetch("/api/websites");

  const toggle = () => setModal(!modal);

  const handleLoadMore = useCallback(() => {
    let more = true;
    fetchApi(more);
  });

  const saveItem = useCallback((newItem) => {
    setItems((items) => [newItem, ...items]);
    displaySuccessMessage("Item added !");
  });

  const editItem = useCallback((newItem, oldItem) => {
    setItems((items) => items.map((i) => (i === oldItem ? newItem : i)));
    displaySuccessMessage("Item updated !");
  });

  const removeItem = useCallback((item) => {
    setItems((items) => items.filter((i) => i !== item));
    displaySuccessMessage("Item removed !");
  });

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
    <>
      <div className="header text-center">
        <h3>Item List</h3>
        <button onClick={toggle} className="btn btn-primary">
          Create item
        </button>
      </div>
      {successMessage && <Alert color="success">{successMessage}</Alert>}
      <ItemList
        isLoading={isLoading}
        items={items}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        onEditItem={editItem}
        onRemoveItem={removeItem}
        user={user}
      />
      <FormModal modal={modal} toggle={toggle} onSave={saveItem} user={user} />
    </>
  );
};

export default ItemApp;
