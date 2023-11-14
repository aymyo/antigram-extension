export const hideElement = (element: HTMLElement | null, value: boolean | string) => {
  if (element !== null) {
    element.style.display = value ? "none" : "block";
  }
};


// collapses the post so it doesn't take up any feed space. 
export const collapsePost = (element: HTMLElement | null, value: boolean | string) => {
  if (element !== null) {
    const firstChild = element.firstChild as HTMLElement
    firstChild.style.display = value ? "none" : "block";
  }
};

// leaves a blank spot on the feed, the post still takes up space but is just not visible
export const hidePost = (element: HTMLElement | null, value: boolean | string) => {
  if (element !== null) {
    element.style.visibility = value ? "hidden" : "";
  }
}


export const hidePosts = (elements: HTMLElement[] | null, value: boolean | string) => {
  elements?.forEach(element => {
    /* setting display: none makes the feed glitch after scrolling ~4 posts */
    // element.style.display = value ? "none" : "block";

    /* i found that visibility: hidden is good but then there a big blank spot on the feed */
    // element.style.visibility = value ? "hidden" : "visible"

    /* this is the best solution i found so far */
    const firstChild = element.firstChild as HTMLElement
    firstChild.style.display = value ? "none" : "block";
  }

  );
};

//Changes Background Color if the setting is activated / restores the original if not
export const changeColor = (
  element: HTMLElement | null,
  color: string | undefined,
  defaultColor: string
) => {
  if (element !== null) {
    element.style.background = color ?? defaultColor;
  }
};
