import { attachLoginHandler, getLogin } from "../../component/login/login.ts";
import {
  insertFragmentIntoElement,
  insertHTMLIntoElement,
} from "../../dom/dom.ts";
import { navigateTo } from "../../service/navigation.ts";
import { state } from "../../store/state.ts";
import { PageType } from "../../type/enum/page-type.enum.ts";

export function loginPage(): void {
  const pageDiv = document.createElement("div");

  const login = getLogin();
  insertHTMLIntoElement(pageDiv, login);
  attachLoginHandler(pageDiv);

  const body = document.querySelector("#app");
  insertFragmentIntoElement(body, pageDiv);
}

export async function loadLoginPage(): Promise<void> {
  state.openMenuCurrentPage = PageType.LOGIN;
  navigateTo(PageType.LOGIN);
}
