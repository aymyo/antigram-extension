import { Component, createResource, createSignal, For } from "solid-js";
import { useSettings } from "../../data/settings";
import { SwitchInput } from "../SwitchInput";

const SettingsForm: Component = () => {
  const { settings, toggleHideExplore, toggleHideStories, toggleHideFeed, toggleHideSuggestions } =
    useSettings();

  const inputs = [
    { label: "Hide Explore", checked: settings.hideExplore, onChange: toggleHideExplore },
    {
      label: "Hide Suggestions",
      checked: settings.hideSuggestions,
      onChange: toggleHideSuggestions
    },
    { label: "Hide Stories", checked: settings.hideStories, onChange: toggleHideStories },
    { label: "Hide Feed", checked: settings.hideFeed, onChange: toggleHideFeed }
  ];

  return (
    <form title="blockerForm">
      <span class="section-h">
        <i class="fa fa-ban" aria-hidden="true"></i>
        <h2>Block sections</h2>
      </span>

      <For each={inputs}>
        {(input) => <SwitchInput id={input.label.replace(" ", "")} {...input} />}
      </For>

      <span class="section-h">
        <i class="fa fa-eye" aria-hidden="true"></i>
        <h2>Appearence</h2>
      </span>

      <div class="ag-label bg">
        Background color
        <input class="ag-color" type="color" id="bg_color" tabindex="0" />
        <label class="ag-toggle" title="Change Background Color">
          <input type="checkbox" id="color" />
          <span class="slider"></span>
        </label>
      </div>

      <div class="ag-save" id="saved_text" tabindex="0"></div>
    </form>
  );
};

export { SettingsForm };
