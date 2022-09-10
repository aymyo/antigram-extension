export const hideElement = (element: HTMLElement | null, value: boolean | string) => {
  if (element !== null) {
    element.style.display = value ? "none" : "block";
  }
};

//Changes Background Color if the setting is activated / restores the original if not
export const changeColor = (
  element: HTMLElement | null,
  color: string | boolean,
  default_color: string,
  value: boolean | string
) => {
  console.log(element, color, value);
  if (element !== null) {
    element.style.background = value ? String(color) : default_color;
  }
};
