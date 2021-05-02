import React, { memo, useCallback, useEffect, useRef } from "react";
import { usePost } from "../api/websites_api";

const ThemeForm = memo(({ onSave, item = null, user, toggle }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const onSuccess = useCallback(
    (item) => {
      onSave(item);
      if (titleRef.current && descriptionRef.current) {
        titleRef.current.value = "";
        descriptionRef.current.value = "";
      }
      toggle();
    },
    [onSave, titleRef, descriptionRef]
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
      title: titleRef.current.value,
      description: descriptionRef.current.value,
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
    }
  }, [item]);

  return (
    <div>
      {isSaving && <div>Saving into the database...</div>}
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            ref={titleRef}
            onChange={handleChange}
          />
          {errors["title"] && <span>{errors["title"]}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            className="form-control"
            ref={descriptionRef}
            onChange={handleChange}
          ></textarea>
          {errors["description"] && <span>{errors["description"]}</span>}
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {item === null ? "Add" : "Save"}
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
});

export default ThemeForm;
