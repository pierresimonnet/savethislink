import React, { memo, useCallback, useState } from "react";
import { usePost } from "../api/websites_api";
import DeleteModal from "../component/DeleteModal";
import FormModal from "../component/FormModal";
import { ThemeCard, WebsiteCard } from "../component/Card";

const Item = memo(({ item, edit, remove, user, ressource }) => {
  const [formModal, setFormModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleEdit = () => setFormModal(!formModal);
  const toggleDelete = () => setDeleteModal(!deleteModal);

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
        <WebsiteCard
          website={item}
          user={user}
          toggleEdit={toggleEdit}
          toggleDelete={toggleDelete}
          isSaving={isSaving}
        />
      )}
      {ressource === "themes" && (
        <ThemeCard
          theme={item}
          user={user}
          toggleEdit={toggleEdit}
          toggleDelete={toggleDelete}
          isSaving={isSaving}
        />
      )}
      <FormModal
        modal={formModal}
        toggle={toggleEdit}
        onSave={handleEdit}
        item={item}
        user={user}
        ressource={ressource}
      >
        Update this item
      </FormModal>
      <DeleteModal
        modal={deleteModal}
        toggle={toggleDelete}
        onDelete={handleDelete}
        item={item}
      >
        Delete this item
      </DeleteModal>
    </div>
  );
});

export default Item;
