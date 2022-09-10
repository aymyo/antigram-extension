import { Component, createSignal } from "solid-js";
import { Settings } from "../util/storage";

const Options: Component = () => {
  const [] = createSignal<Settings>();
  return (
    <div class="ab-body">
      <div class="disclaimer">
        <i class="fa fa-bullhorn" aria-hidden="true"></i>
        New updates coming soon!
      </div>

      <div class="ag-container" id="settings_page" aria-label="antigram settings">
        <header class="ag-header">
          <img class="ag-logo" src="./images/ag128.png" alt="Antigram Logo" />
          <h1 class="ag-h1">Antigram</h1>
        </header>

        <h3 class="ag-h3">Settings</h3>

        <div class="ag-category">
          <h5 class="ag-h5">
            <i class="fa fa-ban" aria-hidden="true"></i>
            Blocker
          </h5>

          <label class="ag-label" tabindex="0" for="explore">
            Hide Explore
            <span class="ag-toggle">
              <input type="checkbox" id="explore" name="explore" />
              <span class="slider"></span>
            </span>
          </label>

          <label class="ag-label" tabindex="0" for="suggestions">
            Hide Suggestions
            <span class="ag-toggle">
              <input type="checkbox" id="suggestions" name="suggestions" />
              <span class="slider"></span>
            </span>
          </label>

          <label class="ag-label" tabindex="0" for="stories">
            Hide Stories
            <span class="ag-toggle">
              <input type="checkbox" id="stories" name="stories" />
              <span class="slider"></span>
            </span>
          </label>

          <label class="ag-label" tabindex="0" for="feed">
            Hide Feed
            <span class="ag-toggle">
              <input type="checkbox" id="feed" name="feed" />
              <span class="slider"></span>
            </span>
          </label>
        </div>

        <div class="ag-category">
          <h5 class="ag-h5">
            <i class="fa fa-eye" aria-hidden="true"></i>
            Appearence
          </h5>

          <div class="ag-label bg">
            Background color
            <input class="ag-color" type="color" id="bg_color" tabindex="0" />
            <label class="ag-toggle" title="Change Background Color">
              <input type="checkbox" id="color" />
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <button class="about-h5" id="about_link" tabindex="0">
          <i class="fa fa-info-circle" aria-hidden="true"></i>
          About
          <i class="fa fa-external-link ag-about"></i>
        </button>

        <div class="ag-save" id="saved_text" tabindex="0"></div>
      </div>

      <div class="ag-container" id="about_page" aria-label="about antigram">
        <header class="ag-header">
          <img class="ag-logo" src="/images/ag128.png" alt="Antigram Logo" />
          <h1 class="ag-h1">Antigram</h1>
        </header>

        <h3 class="ag-h3">About</h3>

        <div class="ag-category">
          <p class="ag-manifesto" tabindex="0">
            Antigram is a chrome extension that gives the user tools to fight back Instagram's
            addictive features. It was made on my free time with the objective of being able to
            check what were my friends up to, without falling into a blackhole of meaningless
            content.
            <br />
            <br />
            Toggle to hide or show instagram's functionalities, they will be updated instantly.
            Antigram is free and it does not track you.
          </p>

          <h5 class="ag-h5">
            <i class="fa fa-handshake-o" aria-hidden="true"></i>
            Support
          </h5>

          <a class="ag-label ag-sup"> Tell a friend! </a>

          <a
            class="ag-label ag-sup"
            href="https://chrome.google.com/webstore/detail/antigram-explore-blocker/igbheapdmolhhmmklmkfjjjncmhihfjh?hl=es"
            target="_blank"
          >
            Leave a review on Chrome Store
            <i class="fa fa-external-link"></i>
          </a>

          <a
            class="ag-label ag-sup"
            href="https://github.com/aymyo/antigram-extension/issues"
            target="_blank"
          >
            Report bugs or make suggestions via Github
            <i class="fa fa-external-link"></i>
          </a>

          <a class="ag-label ag-sup" href="https://www.buymeacoffee.com/aymyo" target="_blank">
            Donate if you can &#60;3
            <i class="fa fa-external-link"></i>
          </a>
        </div>

        <button class="about-h5" id="settings_link">
          <i class="fa fa-cog" aria-hidden="true"></i>
          Back to Settings
          <i class="fa fa-external-link ag-about"></i>
        </button>

        <div class="ag-save" id="saved_text" tabindex="0">
          made by{" "}
          <a href="https://github.com/aymyo" target="_blank">
            aymyo
          </a>
          and
          <a href="https://github.com/aymyo/antigram-extension/graphs/contributors" target="_blank">
            contributors
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Options;
