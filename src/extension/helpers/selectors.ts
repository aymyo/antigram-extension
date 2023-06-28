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

