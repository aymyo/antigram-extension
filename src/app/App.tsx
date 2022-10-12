import { Component } from "solid-js";
import { SettingsForm } from "./components/SettingsForm";
import { Routes, Route, Link } from "@solidjs/router";
import { AboutPage } from "./components/AboutPage";

const App: Component = () => {
  return (
    <div class="mx-auto mt-12 w-128">
      <header class="flex items-center justify-center">
        <img class="w-14 h-14 mt-2 mr-4" src="./images/ag128.png" alt="Antigram Logo" />
        <h1 class="font-serif text-6xl">Antigram</h1>
      </header>

      <nav class="flex justify-around py-8">
        <Link href="/">Settings</Link>
        <Link href="/about">About</Link>
      </nav>

      <Routes>
        <Route path={["/index.html", "/"]} component={SettingsForm} />
        <Route path="/about" component={AboutPage} />
      </Routes>
    </div>
  );
};

export { App };
