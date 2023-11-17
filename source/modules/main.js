import { labelsArray, defaultOptions, selectors, urls } from "../modules/lib.js";

async function main() {
  const loadedSettings = await new Promise((resolve) => {
    chrome.storage.sync.get(labelsArray, resolve);
  });

  if (Object.keys(loadedSettings).length === 0) {
    chrome.storage.sync.set(defaultOptions);
  }

  const settings = Object.keys(loadedSettings).length > 0 ? loadedSettings : defaultOptions;

  const mutationObserver = new MutationObserver(onMutation);

  function onMutation() {
    const path = window.location.pathname;
    const body = document.body;

    // Remove navigation links
    const exploreLink = body?.querySelector(selectors.nav.explore);
    const reelsLink = body?.querySelector(selectors.nav.reels);
    settings.blockExplore && exploreLink?.remove();
    settings.blockReels && reelsLink?.remove();

    if (path === urls.base) {
      // Remove stories
      const storyFeed = body?.querySelector(selectors.storyFeed);
      settings.blockStories && storyFeed?.remove();

      // Remove posts
      const posts = body?.querySelector(selectors.posts);
      const postsLoader = body?.querySelector(selectors.postsLoader);
      const postsContainer = posts?.closest("div");
      settings.blockPosts && postsContainer?.remove();
      settings.blockPosts && postsLoader?.remove();

      // Remove suggested followers
      const suggestedFollowersLink = body?.querySelector(selectors.suggestedFollowers);
      const suggestedFollowersTitle = suggestedFollowersLink?.closest("div");
      const suggestedFollowers = suggestedFollowersTitle?.nextElementSibling;
      settings.blockSuggestedFollowers && suggestedFollowers?.remove();
      settings.blockSuggestedFollowers && suggestedFollowersTitle?.remove();

      // Redirect to 'Following' feed
      if (settings.blockForYouFeed) {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams?.get("variant") === "home" || queryParams?.get("variant") === null) {
          queryParams.set("variant", "following");
          window.location.search = queryParams.toString();
        }
      }
    }

    if (path.includes(urls.reels && settings.blockReels)) {
      const main = body?.querySelector(selectors.main);
      main?.remove();
    }

    if (path.includes(urls.explore) && settings.blockExplore) {
      const main = body?.querySelector(selectors.main);
      main?.remove();
    }

    if (path.includes(urls.stories) && settings.blockStories) {
      const storiesSection = body?.querySelector("section");
      storiesSection?.remove();
    }
  }

  // Start observing the DOM for changes
  mutationObserver.observe(document, {
    subtree: true,
    childList: true
  });

  onMutation([{ addedNodes: [document.documentElement] }]);
}

export { main };
