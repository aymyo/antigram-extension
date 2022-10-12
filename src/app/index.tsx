import { render } from "solid-js/web";
import { App } from "./App";
import { Router } from "@solidjs/router";

import "./styles/reset.css";
import "./styles/styles.css";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
