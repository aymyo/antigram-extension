import { createEffect, createResource, createSignal } from "solid-js";
import { getStoredSettings, defaultSettings, Settings, storeSettings } from "../../util/storage";

const [resourceSettings] = createResource<Settings>(() =>
  import.meta.env.PROD ? getStoredSettings() : defaultSettings
);
const [settings, setSettings] = createSignal<Settings>(resourceSettings() ?? defaultSettings);
createEffect(() => {
  if (import.meta.env.PROD) {
    storeSettings(settings());
  }
});

export function useSettings() {
  return {
    settings: settings(),
    toggleHideExplore: () => setSettings({ ...settings(), hideExplore: !settings().hideExplore }),
    toggleHideSuggestions: () => {
      setSettings({ ...settings(), hideSuggestions: !settings().hideSuggestions });
    },
    toggleHideStories: () => setSettings({ ...settings(), hideStories: !settings().hideStories }),
    toggleHideFeed: () => setSettings({ ...settings(), hideFeed: !settings().hideFeed }),
    setBgColor: (bgColor: string) => setSettings({ ...settings(), bgColor })
  };
}
