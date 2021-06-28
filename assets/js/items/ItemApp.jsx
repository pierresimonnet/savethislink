import React, { useCallback, useEffect, useState } from "react";
import { useFetch } from "../api/websites_api";
import Alert from "../component/Alert";
import ItemList from "./ItemList";
import useModal from "../component/useModal";
import Modal from "../component/Modal";
import ItemForm from "../component/ItemForm";
import Icon from "../component/Icon";

const ItemApp = ({
  context = null,
  user,
  ressource,
  theme = null,
  owner = null,
  open = 0,
}) => {
  const [successMessage, setSuccessMessage] = useState("");
  const { isShowing, toggle } = useModal();

  const [successMessageTimeoutHandle, setSuccessMessageTimeoutHandle] =
    useState(0);

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
    displaySuccessMessage("Contenu ajouté !");
  });

  const editItem = useCallback((newItem, oldItem) => {
    setItems((items) => items.map((i) => (i === oldItem ? newItem : i)));
    displaySuccessMessage("Contenu mis à jour !");
  });

  const removeItem = useCallback((item) => {
    setItems((items) => items.filter((i) => i !== item));
    displaySuccessMessage("Contenu supprimé !");
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
        <div className="d-flex justify-flex-center mb-1" id="js-new">
          {ressource === "websites" ? (
            <button onClick={toggle} className="button-primary" id="js-new-btn">
              <Icon id="add" />
              <span>Ajouter un lien</span>
            </button>
          ) : (
            <a href="/topics/new" className="button-primary" id="js-new-btn">
              Créer un sujet
            </a>
          )}
        </div>
      ) : !user && open === 1 ? (
        <div className="d-flex justify-flex-center mb-1">
          <a href="/login" className="button-secondary">
            Connectez-vous pour{" "}
            {ressource === "websites" ? "ajouter un lien" : ""}
          </a>
        </div>
      ) : !user && ressource === "themes" && context !== "user-profile" ? (
        <div className="d-flex justify-flex-center mb-1">
          <a href="/login" className="button-secondary">
            Connectez-vous pour créer un sujet
          </a>
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
        <Modal isShowing={isShowing} hide={toggle} title="Ajouter un lien">
          <ItemForm onSave={saveItem} toggle={toggle} theme={theme} />
        </Modal>
      )}
    </>
  );
};

export default ItemApp;
