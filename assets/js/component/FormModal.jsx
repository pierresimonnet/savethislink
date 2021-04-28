import React, { memo } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ItemForm from "../component/ItemForm";
import ThemeForm from "../component/ThemeForm";

const FormModal = memo(({ modal, toggle, onSave, item, user, ressource }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create a new item</ModalHeader>
      <ModalBody>
        {ressource === "websites" && (
          <ItemForm onSave={onSave} item={item} user={user} toggle={toggle} />
        )}
        {ressource === "themes" && (
          <ThemeForm onSave={onSave} item={item} user={user} toggle={toggle} />
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
});

export default FormModal;
