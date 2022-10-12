export interface Settings {
  hideExplore: boolean;
  hideSuggestions: boolean;
  hideStories: boolean;
  hideFeed: boolean;
  bgColor?: string;
}

export const defaultSettings: Settings = {
  hideExplore: true,
  hideSuggestions: true,
  hideStories: false,
  hideFeed: false,
  bgColor: "#fafafa"
};

export const storeSettings = (settings: Settings): Promise<void> => {
  return chrome.storage.sync.set({ settings });
};

export const getStoredSettings = async (): Promise<Settings> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["settings"], (response) => {
      let settings: Settings | undefined = response.settings;
      if (settings === undefined) {
        storeSettings(defaultSettings);
        settings = defaultSettings;
      }
      resolve(settings);
    });
  });
};
