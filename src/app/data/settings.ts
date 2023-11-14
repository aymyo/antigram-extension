import { createEffect, createResource, createSignal } from "solid-js";
import { getStoredSettings, defaultSettings, Settings, storeSettings } from "../../storage";

const [resourceSettings] = createResource<Settings>(async () =>
  import.meta.env.PROD ? await getStoredSettings() : defaultSettings
);

const [settings, setSettings] = createSignal<Settings>(defaultSettings);

createEffect(() => {
  if (resourceSettings() !== undefined && !resourceSettings.loading) {
    setSettings(resourceSettings()!);
  }
});

createEffect(() => {
  if (import.meta.env.PROD && !resourceSettings.loading) {
    storeSettings(settings());
  }
});

export function useSettings() {
  return {
    settings: settings,
    toggleHideExplore: () => {
      setSettings({ ...settings(), hideExplore: !settings().hideExplore });
    },
    toggleHideSuggestions: () => {
      setSettings({ ...settings(), hideSuggestions: !settings().hideSuggestions });
    },
    toggleHideStories: () => {
      setSettings({ ...settings(), hideStories: !settings().hideStories });
    },
    toggleHideFeed: () => {
      setSettings({ ...settings(), hideFeed: !settings().hideFeed });
    },
    toggleHideSponsoredPosts: () => {
      setSettings({ ...settings(), hideSponsoredPosts: !settings().hideSponsoredPosts });
    },
    setBgColor: (bgColor: string | undefined) => {
      setSettings({ ...settings(), bgColor: bgColor });
    }
  };
}
