export const defaultOptions = {
  blockReels: true,
  blockExplore: true,
  blockStories: false,
  blockPosts: false,
  blockSuggestedFollowers: true,
  blockForYouFeed: true
};

export const labelsArray = Object.keys(defaultOptions);

export const selectors = {
  main: "[role=main]",
  storyFeed: "div[role='menu']",
  posts: "article",
  postsLoader: "[data-visualcompletion='loading-state']",
  suggestedFollowers: "a[href*='/explore/people/']",
  nav: {
    direct: "a[href*='/direct/inbox/']",
    activity: "a[href*='/accounts/activity']",
    explore: "a[href='/explore/']",
    reels: "a[href*='/reels/']"
  }
};

export const urls = {
  base: "/",
  stories: "/stories",
  reels: "/reels",
  explore: "/explore"
};
