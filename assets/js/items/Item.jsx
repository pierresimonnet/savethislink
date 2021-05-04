import React, { memo } from "react";
import { ThemeCard, WebsiteCard } from "../component/Card";
import useModal from "../component/useModal";
import Modal from "../component/Modal";
import ItemForm from "../component/ItemForm";
import ThemeForm from "../component/ThemeForm";
import DeleteForm from "../component/DeleteForm";

const Item = memo(({ item, edit, remove, user, ressource }) => {
  const { isShowing: isShowingEditModal, toggle: toggleEdit } = useModal();
  const { isShowing: isShowingDeleteModal, toggle: toggleDelete } = useModal();

  const handleEdit = (newItem) => {
    edit(newItem, item);
  };

  const handleDelete = (item) => {
    remove(item);
  };

  return (
    <div>
      {ressource === "websites" && (
        <>
          <WebsiteCard
            website={item}
            user={user}
            toggleEdit={toggleEdit}
            toggleDelete={toggleDelete}
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
            <DeleteForm
              onRemove={handleDelete}
              item={item}
              toggle={toggleDelete}
            />
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
            <DeleteForm
              onRemove={handleDelete}
              item={item}
              toggle={toggleDelete}
            />
          </Modal>
        </>
      )}
    </div>
  );
});

export default Item;
