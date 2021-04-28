import React, { memo } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

const DeleteModal = memo(({ modal, toggle, onDelete, item }) => {
  const handleDelete = () => {
    onDelete(item);
    toggle();
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete item</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={handleDelete}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
});

export default DeleteModal;
