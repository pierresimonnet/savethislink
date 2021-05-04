import React, { useCallback, useEffect, useState } from "react";
import { useFetch } from "../api/websites_api";
import Alert from "../component/Alert";
import ItemList from "./ItemList";
import useModal from "../component/useModal";
import Modal from "../component/Modal";
import ItemForm from "../component/ItemForm";
import ThemeForm from "../component/ThemeForm";

const ItemApp = ({ user, ressource, theme = null, owner = null }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const { isShowing, toggle } = useModal();

  const [
    successMessageTimeoutHandle,
    setSuccessMessageTimeoutHandle,
  ] = useState(0);

  let url = `/api/${ressource}`;
  if (theme) {
    url += `?theme=/api/themes/${theme}`;
  }
  if (owner) {
    url += `?owner=/api/users/${owner}`;
  }

  const {
    load: fetchApi,
    items,
    setItems,
    isLoading,
    count,
    hasMore,
  } = useFetch(url);

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
      <div className="text-center">
        {user && (
          <button onClick={toggle} className="button-primary button-big">
            Create
          </button>
        )}
      </div>
      {successMessage && <Alert type="success" message={successMessage} />}
      <ItemList
        ressource={ressource}
        isLoading={isLoading}
        items={items}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        onEditItem={editItem}
        onRemoveItem={removeItem}
        user={user}
      />
      {ressource === "websites" && (
        <Modal isShowing={isShowing} hide={toggle} title="Create a new website">
          <ItemForm
            onSave={saveItem}
            user={user}
            toggle={toggle}
            theme={theme}
          />
        </Modal>
      )}
      {ressource === "themes" && (
        <Modal isShowing={isShowing} hide={toggle} title="Create a new theme">
          <ThemeForm onSave={saveItem} user={user} toggle={toggle} />
        </Modal>
      )}
    </>
  );
};

export default ItemApp;
