import { Component } from "solid-js";
import { SettingsForm } from "./components/SettingsForm";
import { Routes, Route, Link, useLocation } from "@solidjs/router";
import { AboutPage } from "./components/AboutPage";

const App: Component = () => {
  const isAbout = () => useLocation().pathname === "/about";

  return (
    <div
      class="mx-auto p-6"
      classList={{
        "w-144": isAbout(),
        "w-72": !isAbout()
      }}
    >
      <header class="flex items-center justify-center">
        <img class="w-8 h-8 mt-2 mr-4" src="./images/ag128.png" alt="Antigram Logo" />
        <h1 class="font-serif text-3xl">Antigram</h1>
      </header>

      <nav class="flex justify-center gap-2 my-4">
        <Link href="/index.html" class="border px-2" activeClass="bg-white text-dark">
          Settings
        </Link>
        <Link href="/about" class="border px-2" activeClass="bg-white text-dark">
          About
        </Link>
      </nav>

      <Routes>
        <Route path={["/index.html", "/"]} component={SettingsForm} />
        <Route path="/about" component={AboutPage} />
      </Routes>
    </div>
  );
};

export { App };
