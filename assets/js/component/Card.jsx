import React, { memo } from "react";
import LinkPreview from "./LinkPreview";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
                id="link"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
              </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                    id="add-link"
                  >
                    <path d="M0 0h24v24H0" fill="none" />
                    <path d="M8 11h8v2H8zm12.1 1H22c0-2.76-2.24-5-5-5h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1zM3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM19 12h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
                  </svg>
                  <span>Add</span>
                </a>
              </li>
              <li>
                <button
                  onClick={toggleEdit}
                  disabled={isSaving}
                  className="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                    id="edit"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                  <span>Edit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={toggleDelete}
                  disabled={isSaving}
                  className="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                    id="trash"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
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
          <div>
            <div className="pill">
              <a href={`/themes/${website.theme.slug}`}>
                {website.theme.title}
              </a>
            </div>
            <LinkPreview website={website} />
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                    id="edit"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                  <span>Edit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={toggleDelete}
                  disabled={isSaving}
                  className="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                    id="trash"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
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
