import React, { memo, useCallback } from "react";
import { usePost } from "../api/websites_api";

const DeleteForm = memo(({ onRemove, item }) => {
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
      <button onClick={handleSubmit} className="button-primary">
        Supprimer
      </button>
    </div>
  );
});

export default DeleteForm;
