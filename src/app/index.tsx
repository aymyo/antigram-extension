import { render } from "solid-js/web";
import App from "./options";

import "./styles/reset.css";
import "./styles/styles.css";

render(() => <App />, document.getElementById("root") as HTMLElement);
