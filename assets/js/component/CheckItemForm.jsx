import React, { memo, useCallback, useEffect, useRef } from "react";
import { usePost } from "../api/websites_api";
import { Checkbox } from "../component/Field";

const CheckItemForm = memo(({ onSave, toggle, item }) => {
  const checkRef = useRef(null);

  const onSuccess = useCallback(
    (item) => {
      onSave(item);
      toggle();
    },
    [onSave, checkRef]
  );

  const { load: post, isSaving, errors, clearErrors } = usePost(
    item["@id"],
    "PUT",
    onSuccess
  );

  const handleCancel = (e) => {
    e.preventDefault();
    toggle();
  };

  const handleChange = (e) => {
    clearErrors(e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      approved: checkRef.current.checked,
    };
    post(data);
  };

  useEffect(() => {
    if (item) {
      if (checkRef.current && item.approved) {
        checkRef.current.checked = item.approved;
      }
    }
  }, [item]);

  return (
    <div>
      {isSaving && <div>Enregistrement...</div>}
      <form>
        {errors && <div className="input-error">{errors[""]}</div>}
        <Checkbox
          name="approved"
          error={errors["approved"]}
          onChange={handleChange}
          ref={checkRef}
          help="Le lien ne sera pas visible tant que vous ne l'aurez pas approuvé."
        >
          Approuver
        </Checkbox>
        <div className="d-flex justify-flex-end">
          <button
            className="button-primary"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            Enregistrer
          </button>
          <button onClick={handleCancel} className="button-secondary">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
});

export default CheckItemForm;
