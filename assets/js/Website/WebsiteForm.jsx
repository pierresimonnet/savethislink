import React, { memo, useCallback, useEffect, useRef } from "react";
import { usePost } from "../api/websites_api";
import { CustomSelect } from "../component/select";

const OPTIONS = ["Feature request", "Bug report", "Integration"];

export const WebsiteForm = memo(
  ({ onAddItem, onCancel = null, website = null, user }) => {
    const themeRef = useRef(null);
    const urlRef = useRef(null);
    const commentRef = useRef(null);

    const onSuccess = useCallback(
      (website) => {
        onAddItem(website);
        if (urlRef.current && commentRef.current) {
          themeRef.current.value = "";
          urlRef.current.value = "";
          commentRef.current.value = "";
        }
      },
      [onAddItem, themeRef, urlRef, commentRef]
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
          theme: themeRef.current.value,
          url: urlRef.current.value,
          comment: commentRef.current.value,
        };
        createNew(data);
      },
      [createNew, themeRef, urlRef, commentRef]
    );

    useEffect(() => {
      if (website) {
        if (website.theme.title && themeRef.current) {
          themeRef.current.value = website.theme["@id"];
        }
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
          <CustomSelect
            name="theme"
            ref={themeRef}
            error={errors["theme"]}
            user={user}
          >
            Choose a theme
          </CustomSelect>
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
