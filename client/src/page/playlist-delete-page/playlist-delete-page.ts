import {
  attachPlaylistDeleteHandler,
  getPlaylistDelete,
} from "../../component/playlist-delete/playlist-delete.ts";
import {
  insertFragmentIntoElement,
  insertHTMLIntoElement,
} from "../../dom/dom.ts";
import { navigateTo } from "../../service/navigation.ts";
import { PageType } from "../../type/enum/page-type.enum.ts";

export function playlistDeletePage(): void {
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");

  const playlistDelete = getPlaylistDelete();
  insertHTMLIntoElement(modalOverlay, playlistDelete);
  attachPlaylistDeleteHandler(modalOverlay);

  const body = document.querySelector("#app");
  insertFragmentIntoElement(body, modalOverlay);
}

export async function loadPlaylistDeletePage(): Promise<void> {
  navigateTo(PageType.PLAYLIST_DELETE, true);
}
