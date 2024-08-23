import {
  attachRegistrationHandler,
  getRegistration,
} from "../../component/registration/registration.ts";
import {
  insertFragmentIntoElement,
  insertHTMLIntoElement,
} from "../../dom/dom.ts";
import { navigateTo } from "../../service/navigation.ts";
import { state } from "../../store/state.ts";
import { PageType } from "../../type/enum/page-type.enum.ts";

export function registrationPage(): void {
  const pageDiv = document.createElement("div");

  const registration = getRegistration();
  insertHTMLIntoElement(pageDiv, registration);
  attachRegistrationHandler(pageDiv);

  const body = document.querySelector("#app");
  insertFragmentIntoElement(body, pageDiv);
}

export async function loadRegistrationPage(): Promise<void> {
  state.openMenuCurrentPage = PageType.REGISTRATION;
  navigateTo(PageType.REGISTRATION);
}
