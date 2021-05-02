import React, { memo } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ItemForm from "../component/ItemForm";
import ThemeForm from "../component/ThemeForm";

const FormModal = memo(
  ({ modal, toggle, onSave, item, user, ressource, children }) => {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{children}</ModalHeader>
        <ModalBody>
          {ressource === "websites" && (
            <ItemForm onSave={onSave} item={item} user={user} toggle={toggle} />
          )}
          {ressource === "themes" && (
            <ThemeForm
              onSave={onSave}
              item={item}
              user={user}
              toggle={toggle}
            />
          )}
        </ModalBody>
      </Modal>
    );
  }
);

export default FormModal;
