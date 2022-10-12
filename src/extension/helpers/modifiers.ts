export const hideElement = (element: HTMLElement | null, value: boolean | string) => {
  if (element !== null) {
    element.style.display = value ? "none" : "block";
  }
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
