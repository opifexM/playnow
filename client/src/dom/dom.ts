import { InsertPositionType } from "../type/enum/insert-position-type.enum.ts";

export function insertHTMLIntoElement(
  element: Element | null,
  markup: string,
  position: InsertPositionType = InsertPositionType.BEFOREEND,
): void {
  if (!element) {
    throw new Error("Element is empty");
  }
  if (!markup) {
    throw new Error("Markup is empty");
  }

  element.insertAdjacentHTML(position, markup);
}

export function insertFragmentIntoElement(
  element: Element | null,
  fragment: HTMLDivElement,
  position: InsertPositionType = InsertPositionType.BEFOREEND,
): void {
  if (!element) {
    throw new Error("Element is empty");
  }
  if (!fragment) {
    throw new Error("Fragment is empty");
  }

  element.insertAdjacentElement(position, fragment);
}
