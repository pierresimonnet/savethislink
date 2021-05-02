import React from "react";

export const ThemeCard = ({
  theme,
  user,
  toggleEdit,
  toggleDelete,
  isSaving,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <div>
          <a href={`/themes/${theme.slug}`}>
            <h5 className="card-title">{theme.title}</h5>
          </a>
        </div>
        <div className="card-subtitle mb-2 text-muted">
          By{" "}
          <a href={`/users/${theme.owner.username}`}>{theme.owner.username}</a>
        </div>
        <p className="card-text">{theme.description}</p>
      </div>
      {theme.owner.id === user && (
        <div className="card-footer">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a href={`/websites/new/${theme.slug}`}>&#43; Add</a>
            </li>
            <li className="nav-item">
              <button onClick={toggleEdit} disabled={isSaving} className="btn">
                &#9999;&#65039; edit
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={toggleDelete}
                disabled={isSaving}
                className="btn"
              >
                &#128465; delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export const WebsiteCard = ({
  website,
  user,
  toggleEdit,
  toggleDelete,
  isSaving,
}) => {
  return (
    <div>
      <div>
        <a href={`/websites/${website.theme.slug}`}>{website.theme.title}</a>
      </div>
      <div>
        <a href={website.url} target="_blank" rel="noopener noreferrer">
          {website.url}
        </a>
      </div>
      <p>{website.comment}</p>
      {website.owner.id === user && (
        <div className="text-muted">
          <button onClick={toggleEdit} disabled={isSaving}>
            &#9999;&#65039; edit
          </button>
          <button onClick={toggleDelete} disabled={isSaving}>
            &#128465; delete
          </button>
        </div>
      )}
    </div>
  );
};
