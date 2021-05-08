import React, { memo, useCallback, useEffect, useRef } from "react";
import { usePost } from "../api/websites_api";
import { Toggle, Text, Textarea } from "../component/Field";

const ThemeForm = memo(({ onSave, item = null, toggle }) => {
  const openRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const onSuccess = useCallback(
    (item) => {
      onSave(item);
      if (openRef.current && titleRef.current && descriptionRef.current) {
        titleRef.current.value = "";
        descriptionRef.current.value = "";
      }
      toggle();
    },
    [onSave, openRef, titleRef, descriptionRef]
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      open: openRef.current.checked,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };
    post(data);
  };

  useEffect(() => {
    if (item) {
      if (openRef.current && item.open) {
        openRef.current.checked = item.open;
      }
      if (titleRef.current && item.title) {
        titleRef.current.value = item.title;
      }
      if (descriptionRef.current && item.description) {
        descriptionRef.current.value = item.description;
      }
    }
  }, [item]);

  return (
    <div>
      {isSaving && <div>Saving into the database...</div>}
      <form>
        {errors && <div className="input-error">{errors[""]}</div>}
        <Toggle
          name="open"
          error={errors["open"]}
          onChange={handleChange}
          ref={openRef}
        >
          Open to contributions
        </Toggle>
        <Text
          name="title"
          error={errors["title"]}
          onChange={handleChange}
          ref={titleRef}
          placeholder="Choose a title for this theme"
        >
          Title
        </Text>
        <Textarea
          name="description"
          error={errors["description"]}
          onChange={handleChange}
          ref={descriptionRef}
          placeholder="What is this theme about ?"
        >
          Description
        </Textarea>
        <div className="d-flex justify-flex-end">
          <button
            className="button-primary"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {item === null ? "Add" : "Save"}
          </button>
          <button onClick={handleCancel} className="button-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
});

export default ThemeForm;
