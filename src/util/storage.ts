export interface Settings {
  hideExplore: boolean;
  hideSuggestions: boolean;
  hideStories: boolean;
  hideFeed: boolean;
  bgColor: string | null;
}
export const defaultSettings: Settings = {
  hideExplore: true,
  hideSuggestions: true,
  hideStories: false,
  hideFeed: false,
  bgColor: "#fafafa"
};
export const setSettings = (options: Settings) => chrome.storage.session.set({ options });
export const getSettings = async () => {
  const settings = await chrome.storage.session.get(["options"]);
  return settings as Settings;
};
