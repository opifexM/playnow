import {
  attachPlaylistAddHandler,
  getPlaylistAdd,
} from "../../component/playlist-add/playlist-add.ts";
import {
  insertFragmentIntoElement,
  insertHTMLIntoElement,
} from "../../dom/dom.ts";
import { navigateTo } from "../../service/navigation.ts";
import { PageType } from "../../type/enum/page-type.enum.ts";

export function playlistAddPage(): void {
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  const playlistAdd = getPlaylistAdd();
  insertHTMLIntoElement(modalOverlay, playlistAdd);
  attachPlaylistAddHandler(modalOverlay);

  const body = document.querySelector("#app");
  insertFragmentIntoElement(body, modalOverlay);
}

export async function loadPlaylistAddPage(): Promise<void> {
  navigateTo(PageType.PLAYLIST_ADD, true);
}
