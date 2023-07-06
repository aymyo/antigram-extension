export const navLinkDirect = (): HTMLElement | null =>
  document.querySelector("a[href*='/direct/inbox/']");

export const navLinkActivity = (): HTMLElement | null =>
  document.querySelector("a[href*='/accounts/activity']");

export const navLinkExplore = (): HTMLElement | null =>
  document.querySelector("section > nav a[href*='/explore/']");

export const suggestionsBox = (): HTMLElement | null =>
  (document.querySelector("a[href*='/explore/people/']")?.closest("div")
    ?.nextSibling as HTMLElement) || null;

export const suggestionsLink = (): HTMLElement | null =>
  document.querySelector("a[href*='/explore/people/']")?.closest("div") || null;

export const storiesBox = (): HTMLElement | null =>
  document.querySelectorAll<HTMLElement>("div[role='presentation']")[0] || null;

export const storiesArrow = (): HTMLElement | null =>
  (document.querySelectorAll("div[role='presentation']")[0].nextSibling as HTMLElement) || null;

export const feedBox = (): HTMLElement | null =>
  document.querySelector("article")?.closest("div") || null;

export const feedLoader = (): HTMLElement | null =>
  document.querySelector("[data-visualcompletion='loading-state']");

export const sponsoredPosts = (): HTMLElement[] => {
  return Array.from(document.querySelectorAll<HTMLElement>("article[role='presentation']")).filter(article =>
    Array.from(article.querySelectorAll("span")).some(span => span.textContent === "Sponsored")
  );
};

const selectBanner = (article: HTMLElement): HTMLElement | null => {
  return (article.firstChild as HTMLElement)?.firstChild as HTMLElement;
};

export const isSponsoredPost = (article: HTMLElement): boolean => {
  const postBanner = selectBanner(article);
  return (
    postBanner !== null &&
    Array.from(postBanner.querySelectorAll("span")).some(span => span.textContent === "Sponsored")
  );
};

export const isPostFromUnfollowedAccount = (article: HTMLElement): boolean => {
  const postBanner = selectBanner(article);
  return (
    postBanner !== null &&
    Array.from(postBanner.querySelectorAll("div")).some(div => div.textContent === "Follow")
  );
}

export const isFeedPost = (possiblePost: HTMLElement): boolean =>  possiblePost.matches("article[role='presentation']");

export const isAllCaughtUpFeedMessage = (possiblePost: HTMLElement): boolean => {
  return Array.from(possiblePost.querySelectorAll("span")).some(span => span.textContent === "You're all caught up");
}

export const isBackPastPostsFeedMessage = (el: HTMLElement): boolean => el.matches('div') && el.textContent === "BackPast Posts";
