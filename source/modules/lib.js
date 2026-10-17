export const defaultOptions = {
  blockReels: true,
  blockExplore: true,
  blockStories: false,
  blockPosts: false,
  blockSuggestedFollowers: true,
  blockForYouFeed: true,
  blockThreads: true,
  blockMessagesPopup: false,
  distractionFree: false
};

export const labelsArray = Object.keys(defaultOptions);

export const selectors = {
  main: "[role=main]",
  storyFeed: "div[data-pagelet='story_tray']",
  posts: "article",
  postsLoader: "[data-visualcompletion='loading-state']",
  suggestedFollowers: "a[href*='/explore/people/']",
  nav: {
    direct: "a[href*='/direct/inbox/']",
    activity: "a[href*='/accounts/activity']",
    explore: "a[href*='/explore/']",
    reels: "a[href*='/reels/']",
    threads: "a[href*='threads']"
  }
};

export const urls = {
  base: "/",
  stories: "/stories",
  reels: "/reels",
  explore: "/explore"
};

export const hide = (elements) => {
  if (!elements) {
    return;
  }
  if (elements instanceof Node) {
    elements.style.display = "none";
  }
  if (elements instanceof NodeList) {
    elements.forEach((element) => {
      element.style.display = "none";
    });
  }
};

// The preset is derived, so disabling it restores the user's individual options.
export const getEffectiveSettings = (saved = {}) => {
  const settings = { ...defaultOptions, ...saved };
  return settings.distractionFree
    ? {
        ...settings,
        blockReels: true,
        blockExplore: true,
        blockStories: false,
        blockPosts: true,
        blockSuggestedFollowers: true,
        blockThreads: true,
        blockMessagesPopup: true,
        blockForYouFeed: false
      }
    : settings;
};

export const hideMessagesPopup = (body) => {
  // Identify messaging controls, then hide only their floating corner container.
  // Sidebar inbox links and the full inbox must remain usable with this option.
  const controls = body.querySelectorAll(
    'a[href*="/direct/"], [role="button"], button, svg[aria-label]'
  );
  for (const control of controls) {
    const label = control.getAttribute("aria-label") || control.textContent.trim();
    if (
      !control.matches('a[href*="/direct/"]') &&
      !/^(messages?|messenger|direct)(\s.*)?$/i.test(label)
    ) {
      continue;
    }
    let floating;
    for (let node = control; node && node !== body; node = node.parentElement) {
      if (
        node.matches('main, [role="main"], nav, [role="navigation"]') ||
        node.querySelector('main, [role="main"], article, [data-pagelet="story_tray"]')
      )
        break;
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      if (
        ["fixed", "absolute"].includes(style.position) &&
        rect.width > 0 &&
        rect.width < window.innerWidth * 0.8 &&
        rect.left > window.innerWidth * 0.4 &&
        rect.bottom > window.innerHeight * 0.6
      ) {
        floating = node;
      }
    }
    hide(floating);
  }
};

export const hideHomeDistractions = (body) => {
  // Locate the sidebar by its navigation links rather than Instagram's generated classes.
  const inbox = body.querySelector(selectors.nav.direct);
  let sidebar = inbox?.parentElement;
  while (sidebar && sidebar !== body) {
    if (
      sidebar.querySelector('a[href="/"]') &&
      !sidebar.querySelector('main, [role="main"], article, [data-pagelet="story_tray"]')
    ) {
      const logo = sidebar.querySelector(
        'svg[aria-label="Instagram"], svg[aria-label="Instagram wordmark"]'
      );
      const hideExceptLogo = (node) => {
        for (const child of node.children) {
          if (child.contains(logo)) {
            if (!child.matches('a[href="/"]')) hideExceptLogo(child);
          } else {
            hide(child);
          }
        }
      };
      if (logo) hideExceptLogo(sidebar);
      else hide(sidebar);
      break;
    }
    sidebar = sidebar.parentElement;
  }

  hide(body.querySelectorAll('footer, [role="contentinfo"]'));
  // Desktop's legal links are sometimes a plain div beneath the profile card.
  for (const link of body.querySelectorAll('a[href*="/legal/terms"], a[href*="/privacy/"]')) {
    let footer = link.parentElement;
    while (footer && footer !== body) {
      if (/©/.test(footer.textContent)) {
        if (!footer.querySelector('main, article, img, [data-pagelet="story_tray"]')) hide(footer);
        break;
      }
      footer = footer.parentElement;
    }
  }
};

// Instagram prefixes the tab title with an unread count, e.g. "(1) Instagram".
export const hideTitleNotificationCount = (page = document) => {
  const title = page.title.replace(/^\s*\(\d+\+?\)\s*/, "");
  // Avoid retriggering the observer when the title is already clean.
  if (title !== page.title) page.title = title;
};
