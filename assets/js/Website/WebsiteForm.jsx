import React, { memo, useCallback, useRef } from "react";
import { usePost } from "../api/websites_api";

export const WebsiteForm = memo(
  ({ onAddItem, onCancel = null, website = null }) => {
    const urlRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const commentRef = useRef(null);

    const onSuccess = useCallback(
      (website) => {
        onAddItem(website);
        urlRef.current.value = "";
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        commentRef.current.value = "";
      },
      [onAddItem]
    );
    const url = website ? website["@id"] : "/api/websites";
    const method = website ? "PUT" : "POST";
    const { load: createNew, isSavingNewItem, errors, clearErrors } = usePost(
      url,
      method,
      onSuccess
    );

    const handleChange = (e) => {
      clearErrors(e.target.name);
    };

    const handleFormSubmit = useCallback((e) => {
      e.preventDefault();
      const data = {
        url: urlRef.current.value,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        comment: commentRef.current.value,
      };

      createNew(data);
    });

    return (
      <>
        {isSavingNewItem && <div>Saving into the database...</div>}
        <form onSubmit={handleFormSubmit} noValidate>
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
            <div className={`${errors["title"] ? "has-error" : ""}`}>
              <label htmlFor="website_title" className="required">
                Title
              </label>
              <input
                type="text"
                id="website_title"
                name="title"
                required="required"
                ref={titleRef}
                onChange={handleChange}
              />
              {errors["title"] && <span>{errors["title"]}</span>}
            </div>
            <div className={`${errors["description"] ? "has-error" : ""}`}>
              <label htmlFor="website_description" className="required">
                Description
              </label>
              <textarea
                id="website_description"
                name="description"
                required="required"
                ref={descriptionRef}
                onChange={handleChange}
              ></textarea>
              {errors["description"] && <span>{errors["description"]}</span>}
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
          <button className="btn" type="submit" disabled={isSavingNewItem}>
            Save
          </button>
        </form>
      </>
    );
  }
);
