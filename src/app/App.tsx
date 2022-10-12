import { Component, createSignal } from "solid-js";
import { SettingsForm } from "./components/SettingsForm";
import { Routes, Route, Link } from "@solidjs/router";

import "./styles/app.css";
import { AboutPage } from "./components/AboutPage";

const App: Component = () => {
  return (
    <div class="container">
      <header class="header">
        <img class="ag-logo" src="./images/ag128.png" alt="Antigram Logo" />
        <h1 class="ag-h1">Antigram</h1>
      </header>

      <nav class="nav">
        <Link href="/index.html">Settings</Link>
        <Link href="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/index.html" component={SettingsForm} />
        <Route path="/about" component={AboutPage} />
      </Routes>
    </div>
  );
};

export { App };
