export const hideElement = (element: HTMLElement | null, value: boolean | string) => {
  if (element !== null) {
    element.style.display = value ? "none" : "block";
  }
};

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
