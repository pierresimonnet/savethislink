import React, { memo } from "react";
import { ThemeCard, WebsiteCard } from "../component/Card";
import useModal from "../component/useModal";
import Modal from "../component/Modal";
import ItemForm from "../component/ItemForm";
import ThemeForm from "../component/ThemeForm";
import DeleteForm from "../component/DeleteForm";
import CheckItemForm from "../component/CheckItemForm";

const Item = memo(({ item, edit, remove, user, ressource }) => {
  const { isShowing: isShowingCheckModal, toggle: toggleCheck } = useModal();
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
            toggleCheck={toggleCheck}
          />
          <Modal
            isShowing={isShowingCheckModal}
            hide={toggleCheck}
            title="Vérifier ce lien"
          >
            <CheckItemForm
              onSave={handleEdit}
              item={item}
              toggle={toggleCheck}
            />
          </Modal>
          <Modal
            isShowing={isShowingEditModal}
            hide={toggleEdit}
            title="Editer ce lien"
          >
            <ItemForm onSave={handleEdit} item={item} toggle={toggleEdit} />
          </Modal>
          <Modal
            isShowing={isShowingDeleteModal}
            hide={toggleDelete}
            title="Supprimer ce lien"
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
            title="Editer ce sujet"
          >
            <ThemeForm onSave={handleEdit} item={item} toggle={toggleEdit} />
          </Modal>
          <Modal
            isShowing={isShowingDeleteModal}
            hide={toggleDelete}
            title="Supprimer ce sujet"
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
