import React, { memo } from "react";
import LinkPreview from "./LinkPreview";
import Icon from "./Icon";

export const ThemeCard = memo(
  ({ theme, user, toggleEdit, toggleDelete, isSaving }) => {
    return (
      <div className="card">
        <div className="card-body">
          <div className="d-flex space-between">
            <a href={`/themes/${theme.slug}`} className="card-title">
              {theme.title}
            </a>
            <div className="d-flex flex-centered">
              <Icon id="link" />
              <span>{theme.websitesCount}</span>
            </div>
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
                  <Icon id="add-link" />
                  <span>Add</span>
                </a>
              </li>
              <li>
                <button
                  onClick={toggleEdit}
                  disabled={isSaving}
                  className="button"
                >
                  <Icon id="edit" />
                  <span>Edit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={toggleDelete}
                  disabled={isSaving}
                  className="button"
                >
                  <Icon id="trash" />
                  <span>Delete</span>
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
          <div className="pill">
            <a href={`/themes/${website.theme.slug}`}>{website.theme.title}</a>
          </div>
          <LinkPreview website={website} />
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
                  <Icon id="edit" />
                  <span>Edit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={toggleDelete}
                  disabled={isSaving}
                  className="button"
                >
                  <Icon id="trash" />
                  <span>Delete</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
);
