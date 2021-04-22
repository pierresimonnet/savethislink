import React, { memo, useCallback, useState } from "react";
import { usePost } from "../api/websites_api";
import useModal from "../component/useModal";
import Modal from "../component/modal";
import { WebsiteForm } from "./WebsiteForm";

const VIEW = "VIEW";
const EDIT = "EDIT";

export const WebsiteItem = memo(({ website, onDeleteItem, onUpdateItem }) => {
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useModal();
  const [state, setState] = useState(VIEW);

  const onDeleteCallback = useCallback(() => {
    onDeleteItem(website);
  }, [website]);

  const handleDeleteClick = (e, website) => {
    e.preventDefault();
    website.isDeleting = true;
    deleteItem(website);
  };

  const { load: deleteItem, loading } = usePost(
    website["@id"],
    "DELETE",
    onDeleteCallback
  );

  const handleEdit = useCallback(
    (updatedItem) => {
      onUpdateItem(updatedItem, website);
      toggleEdit();
    },
    [website]
  );

  const toggleEdit = useCallback(() => {
    setState((state) => (state === VIEW ? EDIT : VIEW));
  }, []);

  return (
    <div
      style={{
        opacity: website.isDeleting ? 0.3 : 1,
      }}
    >
      {state === VIEW ? (
        <div>
          <p>{website.id}</p>
          <a href={website.url}>{website.url}</a>
          <p>{website.title}</p>
          <p>{website.description}</p>
          <p>{website.image}</p>
          <p>{website.comment}</p>
        </div>
      ) : (
        <WebsiteForm
          onAddItem={handleEdit}
          website={website}
          onCancel={toggleEdit}
        />
      )}
      {state !== EDIT && (
        <div>
          <button onClick={toggleEdit}>&#9999;&#65039;</button>
          <button onClick={toggleDelete}>&#128465;</button>
          {isShowingDelete && (
            <Modal
              isShowing={isShowingDelete}
              hide={toggleDelete}
              title="Are you sure ?"
            >
              <button
                disabled={loading}
                onClick={(e) => handleDeleteClick(e, website)}
              >
                &#128465;
              </button>
              <button onClick={toggleDelete}>Cancel</button>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
});
