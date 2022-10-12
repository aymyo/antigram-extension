import { Component, createEffect, createSignal } from "solid-js";
import { useSettings } from "../../data/settings";
import { SwitchInput } from "../SwitchInput";

const SettingsForm: Component = () => {
  const {
    settings,
    toggleHideExplore,
    toggleHideStories,
    toggleHideFeed,
    toggleHideSuggestions,
    setBgColor
  } = useSettings();
  const [localBgColor, setLocalBgColor] = createSignal<string>();
  createEffect(() => {
    if (settings().bgColor !== undefined) {
      setLocalBgColor(settings().bgColor);
    }
  });

  return (
    <form title="SettingsForm">
      <FormGroupTitle icon="ban" title="Block sections" />

      <SwitchInput
        id="HideExplore"
        label="Hide Explore"
        checked={settings().hideExplore}
        onChange={toggleHideExplore}
      />
      <SwitchInput
        id="HideSuggestions"
        label="Hide Suggestions"
        checked={settings().hideSuggestions}
        onChange={toggleHideSuggestions}
      />
      <SwitchInput
        id="Hide Stories"
        label="Hide Stories"
        checked={settings().hideStories}
        onChange={toggleHideStories}
      />
      <SwitchInput
        id="Hide Feed"
        label="Hide Feed"
        checked={settings().hideFeed}
        onChange={toggleHideFeed}
      />

      <FormGroupTitle icon="eye" title="Appearance" />

      <div class="switchLabel">
        <span class="mr-auto">Background color</span>
        <input
          class="w-12 h-8 mr-4"
          type="color"
          value={localBgColor() ?? settings().bgColor ?? "#fafafa"}
          onChange={(event) => {
            setLocalBgColor(event.currentTarget.value);
            if (settings().bgColor !== undefined) {
              setBgColor(event.currentTarget.value);
            }
          }}
        />
        <label class="switchToggle">
          <input
            type="checkbox"
            checked={settings().bgColor !== undefined}
            id="bg-color"
            name="Background Color"
            onChange={(event) => {
              setBgColor(event.currentTarget.checked ? localBgColor() : undefined);
            }}
          />
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
