import React from "react";
import { render } from "react-dom";
import WebsiteApp from "./Website/WebsiteApp";

render(
  <WebsiteApp user={window.USER} />,
  document.getElementById("website-app")
);
