import React, { useCallback, useEffect, useState } from "react";
import { useFetch } from "../api/websites_api";
import Alert from "../component/Alert";
import ItemList from "./ItemList";
import useModal from "../component/useModal";
import Modal from "../component/Modal";
import ItemForm from "../component/ItemForm";
import ThemeForm from "../component/ThemeForm";
import Icon from "../component/Icon";

const ItemApp = ({ user, ressource, theme = null, owner = null, open = 0 }) => {
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
      {(user && !owner) || user === owner || (user && open === 1) ? (
        <div className="d-flex justify-flex-center mb-1">
          <button onClick={toggle} className="button-primary">
            <Icon id="add" />
            <span>
              {ressource === "websites"
                ? "Add a new link"
                : "Create a new theme"}
            </span>
          </button>
        </div>
      ) : null}
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
        <Modal isShowing={isShowing} hide={toggle} title="Add a new link">
          <ItemForm onSave={saveItem} toggle={toggle} theme={theme} />
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
