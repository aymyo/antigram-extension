import { getStoredSettings } from "../storage";
import { collapsePost, hidePost, hidePosts } from "./helpers/modifiers";
import * as select from "./helpers/selectors";

// this is all blatantly stolen/informed by the wonderful work at this stackoverflow answer:
// https://stackoverflow.com/questions/32533580/deleting-dom-elements-before-the-page-is-displayed-to-the-screen-in-a-chrome-ex/32537455#32537455




function onVisible(element: HTMLElement, callback: any) {
  // this function taken from: https://stackoverflow.com/questions/1462138/event-listener-for-when-element-becomes-visible
  new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        callback(element);
        observer.disconnect();
      }
    });
  }).observe(element);
}

let count = 0;

async function ApplyAntigram() {
  let suggestedPostsVisible = false;
  let allCaughtUpIndex = -1;

  // in case the content script was injected after the page is partially loaded

  const path = window.location.pathname;
  const settings = await getStoredSettings();
  console.log("path: ", path);
  console.log("url is: ", window.location.href)

  if (path === "/") {
    console.log("on home page")
    const mutationObserver = new MutationObserver(onMutation); // will invoke onMutation whenever the DOM changes

    // this onMutation function essentially just contains a stream of DOM elements that are 
    // being added to the page. By intercepting them, we can hide them before they are visible.
    function onMutation(mutations: MutationRecord[]): void {

      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          // console.log("count: ", count++);
          const element = node as HTMLElement;
          if (!(element instanceof HTMLElement)) continue;

          // if the top of the page has "Past Posts" in it, then we need to stop hidding posts,
          // this scenario happens when you click "see older posts" on the home page
          // I tried to do this by checking to see if the url changed but since onMutation 
          // is called on page load, and clicking "see older posts" doesn't reload the page,
          // we have to intercept the change to the DOM and realize that we need to reset
          if (select.isBackPastPostsFeedMessage(element)) {
            suggestedPostsVisible = false;
            allCaughtUpIndex = -1;
          }

          // once the feed element that says "You're all caught up" is placed in the DOM,
          // everything after it is a suggested post. 
          // we have to hide it instead of collapsing to preserve the vertical space
          // because ig will continue to load posts if the vertical space is available
          if (suggestedPostsVisible &&
            select.isFeedPost(element) &&
            Array.from(element.parentElement!.children).indexOf(element) > allCaughtUpIndex
          ) {
            hidePost(element, settings.hideSuggestions);
            continue;
          }

          if (select.isAllCaughtUpFeedMessage(element)) {
            suggestedPostsVisible = true;
            allCaughtUpIndex = Array.from(element.parentElement!.children).indexOf(element);
            const siblings = element.parentElement?.children as HTMLCollectionOf<HTMLElement>;
            for (let i = allCaughtUpIndex + 1; i < siblings!.length; i++) {
              hidePost(siblings![i], settings.hideSuggestions);
            }
            continue;
          }

          if (!select.isFeedPost(element)) continue;

          // this removes sponsored posts with "Sponsored" in the banner
          if (select.isSponsoredPost(element)) collapsePost(element, settings.hideSponsoredPosts);

          // this removes post with the "Follow" button in the banner
          if (select.isPostFromUnfollowedAccount(element)) collapsePost(element, settings.hideSuggestions);

          // if (!select.isSponsoredPost(element) && !select.isPostFromUnfollowedAccount(element)) continue;
          // hidePost(element, settings.hideSponsoredPosts || settings.hidePostsFromUnfollowedAccounts);

        }
      }
    }
    function observe() {
      mutationObserver.observe(document, {
        subtree: true,
        childList: true,
      });
    }
    observe();
    onMutation([{ addedNodes: [document.documentElement] }] as unknown as MutationRecord[]);
  }

  // else just remove sidebar features:

}


ApplyAntigram();