import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { usePost } from "../api/websites_api";
import { Toggle, Text, Textarea } from "../component/Field";

const ThemeForm = memo(({ onSave, item = null, toggle }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const privateRef = useRef(null);
  const openRef = useRef(null);
  const approveRef = useRef(null);
  const [isOpenDisabled, setIsOpenDisabled] = useState(false);
  const [isApproveDisabled, setIsApproveDisabled] = useState(true);

  const onSuccess = useCallback(
    (item) => {
      onSave(item);
      if (
        privateRef.current &&
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
    [onSave, privateRef, openRef, titleRef, descriptionRef, approveRef]
  );

  const url = item ? item["@id"] : "/api/themes";
  const method = item ? "PUT" : "POST";
  const {
    load: post,
    isSaving,
    errors,
    clearErrors,
  } = usePost(url, method, onSuccess);

  const handleCancel = (e) => {
    e.preventDefault();
    toggle();
  };

  const handleChange = (e) => {
    clearErrors(e.target.name);
  };

  const handleToggle = (e) => {
    if (e.target.name === "private" && e.target.checked) {
      setIsOpenDisabled(e.target.checked);
    } else {
      setIsOpenDisabled(false);
    }

    if (e.target.name === "open") {
      setIsApproveDisabled(!e.target.checked);
    }

    if (!e.target.checked) {
      openRef.current.checked = false;
      approveRef.current.checked = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      private: privateRef.current.checked,
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
      if (privateRef.current && item.private) {
        privateRef.current.checked = item.private;
        setIsOpenDisabled(item.private);
      }
      if (openRef.current && item.open) {
        openRef.current.checked = item.open;
        setIsApproveDisabled(!item.open);
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
          name="private"
          error={errors["private"]}
          onChange={handleToggle}
          ref={privateRef}
          help="Vous seul pourrez voir ce sujet et y ajouter des liens."
        >
          Sujet privé
        </Toggle>
        <Toggle
          name="open"
          error={errors["open"]}
          onChange={handleToggle}
          ref={openRef}
          help="Les utilisateurs pourront ajouter des liens à ce sujet."
          disabled={isOpenDisabled}
        >
          Ouvrir aux contributions
        </Toggle>
        <Toggle
          name="approve"
          error={errors["approve"]}
          ref={approveRef}
          help="Les nouvelles contributions avant leur publication."
          disabled={isApproveDisabled}
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
