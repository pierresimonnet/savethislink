import React from "react";
import { render } from "react-dom";
import ItemApp from "./items/ItemApp";

const app = document.getElementById("app");
const ressource = app.dataset.ressource;
const theme = app.dataset.theme;
const owner = app.dataset.owner;

render(
  <ItemApp
    user={window.USER}
    ressource={ressource}
    theme={theme}
    owner={owner}
  />,
  app
);
