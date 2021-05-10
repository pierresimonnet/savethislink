import React from "react";
import { render } from "react-dom";
import ItemApp from "./items/ItemApp";

if (document.getElementById("app")) {
  const app = document.getElementById("app");
  const context = app.dataset.context;
  const ressource = app.dataset.ressource;
  const theme = app.dataset.theme;
  const owner = parseInt(app.dataset.owner);
  const open = parseInt(app.dataset.open);

  render(
    <ItemApp
      context={context}
      user={window.USER}
      ressource={ressource}
      theme={theme}
      owner={owner}
      open={open}
    />,
    app
  );
}
