import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { usePost } from "../api/websites_api";
import { Toggle, Text, Textarea } from "../component/Field";

const ThemeForm = memo(({ onSave, item = null, toggle }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const openRef = useRef(null);
  const approveRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const onSuccess = useCallback(
    (item) => {
      onSave(item);
      if (
        openRef.current &&
        titleRef.current &&
        descriptionRef.current &&
        approveRef.current
      ) {
        titleRef.current.value = "";
        descriptionRef.current.value = "";
      }
      toggle();
    },
    [onSave, openRef, titleRef, descriptionRef, approveRef]
  );

  const url = item ? item["@id"] : "/api/themes";
  const method = item ? "PUT" : "POST";
  const { load: post, isSaving, errors, clearErrors } = usePost(
    url,
    method,
    onSuccess
  );

  const handleCancel = (e) => {
    e.preventDefault();
    toggle();
  };

  const handleChange = (e) => {
    clearErrors(e.target.name);
  };

  const handleToggle = (e) => {
    setIsDisabled(!e.target.checked);
    if (!e.target.checked) {
      approveRef.current.checked = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      open: openRef.current.checked,
      approve: approveRef.current.checked,
    };
    post(data);
  };

  useEffect(() => {
    if (item) {
      if (titleRef.current && item.title) {
        titleRef.current.value = item.title;
      }
      if (descriptionRef.current && item.description) {
        descriptionRef.current.value = item.description;
      }
      if (openRef.current && item.open) {
        openRef.current.checked = item.open;
        setIsDisabled(!item.open);
      }
      if (approveRef.current && item.approve) {
        approveRef.current.checked = item.approve;
      }
    }
  }, [item]);

  return (
    <div>
      {isSaving && <div>Enregistrement...</div>}
      <form>
        {errors && <div className="input-error">{errors[""]}</div>}
        <Text
          name="title"
          error={errors["title"]}
          onChange={handleChange}
          ref={titleRef}
          placeholder="Titre du sujet"
          required
        >
          Titre
        </Text>
        <Textarea
          name="description"
          error={errors["description"]}
          onChange={handleChange}
          ref={descriptionRef}
          placeholder="A propos de quoi est ce sujet ?"
          required
        >
          Description
        </Textarea>
        <Toggle
          name="open"
          error={errors["open"]}
          onChange={handleToggle}
          ref={openRef}
          help="Si activé, les utilisateurs pourront ajouter des liens à ce sujet."
        >
          Ouvrir aux contributions
        </Toggle>
        <Toggle
          name="approve"
          error={errors["approve"]}
          ref={approveRef}
          help="Approuver les nouvelles contributions avant leur publication."
          disabled={isDisabled}
        >
          Approuver les contributions
        </Toggle>
        <div className="d-flex justify-flex-end">
          <button
            className="button-primary"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {item === null ? "Créer" : "Enregistrer"}
          </button>
          <button onClick={handleCancel} className="button-secondary">
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
});

export default ThemeForm;
