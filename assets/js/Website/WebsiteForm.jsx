import React, { memo, useCallback, useEffect, useRef } from "react";
import { usePost } from "../api/websites_api";

export const WebsiteForm = memo(
  ({ onAddItem, onCancel = null, website = null }) => {
    const urlRef = useRef(null);
    const commentRef = useRef(null);

    const onSuccess = useCallback(
      (website) => {
        onAddItem(website);
        if (urlRef.current) {
          urlRef.current.value = "";
          commentRef.current.value = "";
        }
      },
      [onAddItem, urlRef, commentRef]
    );

    const url = website ? website["@id"] : "/api/websites";
    const method = website ? "PUT" : "POST";
    const { load: createNew, isSaving, errors, clearErrors } = usePost(
      url,
      method,
      onSuccess
    );

    const handleChange = (e) => {
      clearErrors(e.target.name);
    };

    const handleFormSubmit = useCallback(
      (e) => {
        e.preventDefault();
        const data = {
          url: urlRef.current.value,
          comment: commentRef.current.value,
        };

        createNew(data);
      },
      [createNew, urlRef, commentRef]
    );

    useEffect(() => {
      if (website) {
        if (website.url && urlRef.current) {
          urlRef.current.value = website.url;
        }
        if (website.comment && commentRef.current) {
          commentRef.current.value = website.comment;
        }
      }
    }, [website]);

    return (
      <>
        {isSaving && <div>Saving into the database...</div>}
        <form method="post" onSubmit={handleFormSubmit} noValidate>
          <div>
            <div className={`${errors["url"] ? "has-error" : ""}`}>
              <label htmlFor="website_url" className="required">
                Url
              </label>
              <input
                type="url"
                id="website_url"
                name="url"
                required="required"
                ref={urlRef}
                onChange={handleChange}
              />
              {errors["url"] && <span>{errors["url"]}</span>}
            </div>
            <div className={`${errors["comment"] ? "has-error" : ""}`}>
              <label htmlFor="website_comment" className="required">
                Comment
              </label>
              <textarea
                id="website_comment"
                name="comment"
                required="required"
                ref={commentRef}
                onChange={handleChange}
              ></textarea>
              {errors["comment"] && <span>{errors["comment"]}</span>}
            </div>
          </div>
          <button type="submit" disabled={isSaving}>
            {website === null ? "Add" : "Edit"}
          </button>
          {onCancel && (
            <button type="submit" onClick={onCancel}>
              Cancel
            </button>
          )}
        </form>
      </>
    );
  }
);
