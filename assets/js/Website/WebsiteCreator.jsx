import React, { useRef, useState } from "react";

export default function WebsiteCreator({ onAddItem }) {
  const urlRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const commentRef = useRef(null);
  const [errors, setErrors] = useState({
    url: "",
    title: "",
    description: "",
    comment: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const url = urlRef.current.value;
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const comment = commentRef.current.value;

    if (url.length <= 0) {
      setErrors({ ...errors, url: "please enter a url" });

      return;
    }
    if (title.length <= 0) {
      setErrors({ ...errors, title: "please enter a title" });

      return;
    }
    if (description.length <= 0) {
      setErrors({ ...errors, description: "please enter a description" });

      return;
    }
    if (comment.length <= 0) {
      setErrors({ ...errors, comment: "please enter a comment" });

      return;
    }

    onAddItem(url, title, description, comment);
    setErrors({ ...errors, url: "", title: "", description: "", comment: "" });

    urlRef.current.value = "";
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    commentRef.current.value = "";
  };

  return (
    <form onSubmit={handleFormSubmit} noValidate>
      <div>
        <div className={`${errors.url ? "has-error" : ""}`}>
          <label htmlFor="website_url" className="required">
            Url
          </label>
          <input
            type="url"
            id="website_url"
            name="website[url]"
            required="required"
            ref={urlRef}
          />
          {errors.url && <span>{errors.url}</span>}
        </div>
        <div className={`${errors.title ? "has-error" : ""}`}>
          <label htmlFor="website_title" className="required">
            Title
          </label>
          <input
            type="text"
            id="website_title"
            name="website[title]"
            required="required"
            ref={titleRef}
          />
          {errors.title && <span>{errors.title}</span>}
        </div>
        <div className={`${errors.description ? "has-error" : ""}`}>
          <label htmlFor="website_description" className="required">
            Description
          </label>
          <textarea
            id="website_description"
            name="website[description]"
            required="required"
            ref={descriptionRef}
          ></textarea>
          {errors.description && <span>{errors.description}</span>}
        </div>
        <div className={`${errors.comment ? "has-error" : ""}`}>
          <label htmlFor="website_comment" className="required">
            Comment
          </label>
          <textarea
            id="website_comment"
            name="website[comment]"
            required="required"
            ref={commentRef}
          ></textarea>
          {errors.comment && <span>{errors.comment}</span>}
        </div>
        <input
          type="hidden"
          id="website__token"
          name="website[_token]"
          value="AyP0KXnfMrDUhmIuHVCijNln0bgqVnCiPvhDtJEfvkU"
        />
      </div>
      <button className="btn">Save</button>
    </form>
  );
}
