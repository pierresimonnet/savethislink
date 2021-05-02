import React, { memo, useCallback } from "react";
import { usePost } from "../api/websites_api";
import { ThemeCard, WebsiteCard } from "../component/Card";
import useModal from "../component/useModal";
import Modal from "../component/Modal";
import ItemForm from "../component/ItemForm";
import ThemeForm from "../component/ThemeForm";

const Item = memo(({ item, edit, remove, user, ressource }) => {
  const { isShowing: isShowingEditModal, toggle: toggleEdit } = useModal();
  const { isShowing: isShowingDeleteModal, toggle: toggleDelete } = useModal();

  const handleEdit = (newItem) => {
    edit(newItem, item);
  };

  const onDeleteCallback = useCallback(() => {
    remove(item);
  }, [item]);

  const { load: deleteItem, isSaving } = usePost(
    item["@id"],
    "DELETE",
    onDeleteCallback
  );

  const handleDelete = (item) => {
    deleteItem(item);
  };

  return (
    <div
      style={{
        opacity: isSaving ? 0.3 : 1,
      }}
    >
      {ressource === "websites" && (
        <>
          <WebsiteCard
            website={item}
            user={user}
            toggleEdit={toggleEdit}
            toggleDelete={toggleDelete}
            isSaving={isSaving}
          />
          <Modal
            isShowing={isShowingEditModal}
            hide={toggleEdit}
            title="Edit this website"
          >
            <ItemForm
              onSave={handleEdit}
              item={item}
              user={user}
              toggle={toggleEdit}
            />
          </Modal>
          <Modal
            isShowing={isShowingDeleteModal}
            hide={toggleDelete}
            title="Delete this website"
          >
            <button onClick={handleDelete}>Delete</button>
          </Modal>
        </>
      )}
      {ressource === "themes" && (
        <>
          <ThemeCard
            theme={item}
            user={user}
            toggleEdit={toggleEdit}
            toggleDelete={toggleDelete}
            isSaving={isSaving}
          />

          <Modal
            isShowing={isShowingEditModal}
            hide={toggleEdit}
            title="Edit this theme"
          >
            <ThemeForm
              onSave={handleEdit}
              item={item}
              user={user}
              toggle={toggleEdit}
            />
          </Modal>
          <Modal
            isShowing={isShowingDeleteModal}
            hide={toggleDelete}
            title="Delete this theme"
          >
            <button onClick={handleDelete}>Delete</button>
          </Modal>
        </>
      )}
    </div>
  );
});

export default Item;
