import React, { memo } from "react";
import LinkPreview from "./LinkPreview";
import Icon from "./Icon";

export const ThemeCard = memo(
  ({ theme, user, toggleEdit, toggleDelete, isSaving }) => {
    return (
      <div className="card">
        <div className="card-body">
          <div className="d-flex space-between align-start">
            <a href={`/topics/${theme.slug}`} className="card-title">
              {theme.title}
            </a>
            <div className="flex-centered">
              <span
                className={`status status-${theme.open ? "open" : "closed"}`}
              >
                {theme.open ? "ouvert" : "fermé"}
              </span>
              {theme.approve && <Icon id="shield" />}
              <Icon id="link" />
              <span>{theme.websitesCount}</span>
            </div>
          </div>
          <div className="card-subtitle text-muted">
            <a href={`/users/${theme.owner.username}`} className="decorated">
              {theme.owner.username}
            </a>
          </div>
          <p className="card-text">{theme.description}</p>
        </div>

        <div className="card-footer">
          <ul className="d-flex justify-flex-end flex-vertical-centered card-actions">
            {theme.open || theme.owner.id === user ? (
              <li>
                <a href={`/websites/new/${theme.slug}`} className="button">
                  <Icon id="add-link" />
                  <span>Ajouter</span>
                </a>
              </li>
            ) : null}
            {theme.owner.id === user && (
              <>
                <li>
                  <button
                    onClick={toggleEdit}
                    disabled={isSaving}
                    className="button"
                  >
                    <Icon id="edit" />
                    <span>Editer</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleDelete}
                    disabled={isSaving}
                    className="button"
                  >
                    <Icon id="trash" />
                    <span>Supprimer</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    );
  }
);

export const WebsiteCard = memo(
  ({ website, user, toggleEdit, toggleDelete, toggleCheck, isSaving }) => {
    return (
      <div
        className={`card ${
          website.theme.approve && !website.approved ? "outline" : ""
        }`}
      >
        {website.theme.approve && !website.approved && (
          <div className="flex-centered outline-alert">
            <Icon id="shield" />
            <span>En attente de vérification</span>
          </div>
        )}
        <div className="card-body">
          <div className="pill">
            <a href={`/topics/${website.theme.slug}`}>{website.theme.title}</a>
          </div>
          <LinkPreview website={website} />
          <div className="card-subtitle text-muted">
            <a href={`/users/${website.owner.username}`} className="decorated">
              {website.owner.username}
            </a>
          </div>
          <p className="card-text">{website.comment}</p>
        </div>
        <div className="card-footer">
          <ul className="d-flex justify-flex-end flex-vertical-centered card-actions">
            {website.theme.approve && website.theme.owner.id === user && (
              <li>
                <button
                  onClick={toggleCheck}
                  disabled={isSaving}
                  className="button"
                >
                  <Icon id="check" />
                  <span>Vérifier</span>
                </button>
              </li>
            )}
            {website.owner.id === user && (
              <>
                <li>
                  <button
                    onClick={toggleEdit}
                    disabled={isSaving}
                    className="button"
                  >
                    <Icon id="edit" />
                    <span>Editer</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleDelete}
                    disabled={isSaving}
                    className="button"
                  >
                    <Icon id="trash" />
                    <span>Supprimer</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    );
  }
);
