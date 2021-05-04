import React, { memo, useCallback } from "react";
import { usePost } from "../api/websites_api";

const DeleteForm = memo(({ onRemove, toggle, item }) => {
  const onSuccess = useCallback(() => {
    onRemove(item);
  }, []);

  const { load: deleteItem, isSaving } = usePost(
    item["@id"],
    "DELETE",
    onSuccess
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteItem(item);
  };

  return (
    <div>
      <p>Are you sure you want to delete this item ?</p>
      <button onClick={handleSubmit} className="button-primary">
        Delete
      </button>
    </div>
  );
});

export default DeleteForm;
