import { Component, createResource, createSignal, For } from "solid-js";
import { defaultSettings, getSettings } from "../../../util/storage";
import { SwitchInput } from "../SwitchInput";

const SettingsForm: Component = () => {
  const [settings, { refetch }] = createResource(getSettings, { initialValue: defaultSettings });
  const { hideExplore, hideFeed, hideStories, hideSuggestions, bgColor } = settings();

  const inputs = [
    { label: "Hide Explore", value: hideExplore },
    { label: "Hide Suggestions", value: hideSuggestions },
    { label: "Hide Stories", value: hideStories },
    { label: "Hide Feed", value: hideFeed }
  ];

  return (
    <form title="blockerForm">
      <span class="section-h">
        <i class="fa fa-ban" aria-hidden="true"></i>
        <h2>Block sections</h2>
      </span>

      <For each={inputs}>
        {(input) => (
          <SwitchInput
            id={input.label.replace(" ", "")}
            label={input.label}
            checked={input.value}
          />
        )}
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
