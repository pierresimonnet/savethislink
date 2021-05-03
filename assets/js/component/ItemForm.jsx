import React, { memo, useCallback, useEffect, useRef } from "react";
import { usePost } from "../api/websites_api";
import { CustomSelect } from "../component/CustomSelect";
import { Url, Textarea } from "../component/Field";

const ItemForm = memo(({ onSave, item = null, user, toggle }) => {
  const themeRef = useRef(null);
  const urlRef = useRef(null);
  const commentRef = useRef(null);

  const onSuccess = useCallback(
    (item) => {
      onSave(item);
      if (urlRef.current && commentRef.current) {
        themeRef.current.value = "";
        urlRef.current.value = "";
        commentRef.current.value = "";
      }
      toggle();
    },
    [onSave, themeRef, urlRef, commentRef]
  );

  const url = item ? item["@id"] : "/api/websites";
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
      theme: themeRef.current.value,
      url: urlRef.current.value,
      comment: commentRef.current.value,
    };
    post(data);
  };

  useEffect(() => {
    if (item) {
      if (urlRef.current && item.url) {
        urlRef.current.value = item.url;
      }
      if (commentRef.current && item.comment) {
        commentRef.current.value = item.comment;
      }
    }
  }, [item]);

  return (
    <div>
      {isSaving && <div>Saving into the database...</div>}
      <form>
        <CustomSelect
          name="theme"
          ref={themeRef}
          error={errors["theme"]}
          user={user}
          onChange={handleChange}
          selected={item ? item.theme["@id"] : ""}
        >
          Choose a theme
        </CustomSelect>
        <Url
          name="url"
          error={errors["url"]}
          onChange={handleChange}
          ref={urlRef}
        >
          Url
        </Url>
        <Textarea
          name="comment"
          error={errors["comment"]}
          onChange={handleChange}
          ref={commentRef}
        >
          Comment
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

export default ItemForm;
