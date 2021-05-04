import React, { memo } from "react";

export const ThemeCard = memo(
  ({ theme, user, toggleEdit, toggleDelete, isSaving }) => {
    return (
      <div className="card">
        <div className="card-body">
          <div className="d-flex space-between">
            <a href={`/themes/${theme.slug}`} className="card-title">
              {theme.title}
            </a>
            <div>&#128279; {theme.websitesCount}</div>
          </div>
          <div className="card-subtitle text-muted">
            By{" "}
            <a href={`/users/${theme.owner.username}`} className="decorated">
              {theme.owner.username}
            </a>
          </div>
          <p className="card-text">{theme.description}</p>
        </div>
        {theme.owner.id === user && (
          <div className="card-footer">
            <ul className="d-flex justify-flex-end">
              <li>
                <a href={`/websites/new/${theme.slug}`} className="button">
                  &#43; Add
                </a>
              </li>
              <li>
                <button
                  onClick={toggleEdit}
                  disabled={isSaving}
                  className="button"
                >
                  &#9999;&#65039; Edit
                </button>
              </li>
              <li>
                <button
                  onClick={toggleDelete}
                  disabled={isSaving}
                  className="button"
                >
                  &#128465; Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
);

export const WebsiteCard = memo(
  ({ website, user, toggleEdit, toggleDelete, isSaving }) => {
    return (
      <div className="card">
        <div className="card-body">
          <div>
            <div className="pill">
              <a href={`/themes/${website.theme.slug}`}>
                {website.theme.title}
              </a>
            </div>
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-title"
            >
              {website.url}
            </a>
          </div>
          <p className="card-text">{website.comment}</p>
        </div>
        {website.owner.id === user && (
          <div className="card-footer">
            <ul className="d-flex justify-flex-end">
              <li>
                <button
                  onClick={toggleEdit}
                  disabled={isSaving}
                  className="button"
                >
                  &#9999;&#65039; Edit
                </button>
              </li>
              <li>
                <button
                  onClick={toggleDelete}
                  disabled={isSaving}
                  className="button"
                >
                  &#128465; Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
);
