import React, { memo } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ItemForm from "../component/ItemForm";

const FormModal = memo(({ modal, toggle, onSave, item, user }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create a new item</ModalHeader>
      <ModalBody>
        <ItemForm onSave={onSave} item={item} user={user} toggle={toggle} />
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
