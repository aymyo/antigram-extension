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
    <form title="SettingsForm">
      <div class="mb-8">
        Toggle to hide or show Instagram's functionalities, they will be updated instantly.
      </div>

      <FormGroupTitle icon="ban" title="Block sections" />

      <For each={inputs}>
        {(input) => <SwitchInput id={input.label.replace(" ", "")} {...input} />}
      </For>

      <FormGroupTitle icon="eye" title="Appearance" />

      <div class="switchLabel">
        <span class="mr-auto">Background color</span>
        <input class="w-12 h-8 mr-4" type="color" />
        <label class="switchToggle">
          <input type="checkbox" checked={true} id="bg-color" name="Background Color" />
          <span class="slider"></span>
        </label>
      </div>
    </form>
  );
};

export { SettingsForm };

const FormGroupTitle: Component<{ icon: string; title: string }> = ({ icon, title }) => {
  return (
    <>
      <span class="flex items-center text-xl mt-2">
        <i class={`fa fa-${icon} mr-2`} aria-hidden="true"></i>
        <h2>{title}</h2>
      </span>
      <hr class="mb-4" />
    </>
  );
};
