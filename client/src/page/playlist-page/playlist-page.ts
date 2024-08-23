import {
  attachFooterHandler,
  footerUpdateAndRenderSong,
  getFooter,
} from "../../component/footer/footer.ts";
import {
  attachHeaderHandler,
  getHeader,
} from "../../component/header/header.ts";
import { attachMenuHandler, getMenu } from "../../component/menu/menu.ts";
import {
  attachPlaylistListHandler,
  getPlaylistList,
} from "../../component/playlist-list/playlist-list.ts";
import {
  insertFragmentIntoElement,
  insertHTMLIntoElement,
} from "../../dom/dom.ts";
import { navigateTo } from "../../service/navigation.ts";
import { playlistAction } from "../../store/action.ts";
import { state } from "../../store/state.ts";
import { PageType } from "../../type/enum/page-type.enum.ts";

export function playlistPage(): void {
  const playlistPageDiv = document.createElement("div");
  playlistPageDiv.classList.add("over-wrapper");
  playlistPageDiv.style.position = "relative";
  playlistPageDiv.style.overflow = "hidden";

  const header = getHeader();
  insertHTMLIntoElement(playlistPageDiv, header);
  attachHeaderHandler(playlistPageDiv);

  const contentWrap = document.createElement("div");
  contentWrap.classList.add("content-wrap", "flex");
  const leftMenu = getMenu();
  insertHTMLIntoElement(contentWrap, leftMenu);
  attachMenuHandler(contentWrap);

  const matchingSearchPlaylists = state.playlists.filter((playlist) =>
    playlist.name.toLowerCase().startsWith(state.searchParam),
  );
  const playlistList = getPlaylistList(matchingSearchPlaylists);
  insertHTMLIntoElement(contentWrap, playlistList);
  insertFragmentIntoElement(playlistPageDiv, contentWrap);
  attachPlaylistListHandler(playlistPageDiv);

  const footer = getFooter();
  insertHTMLIntoElement(playlistPageDiv, footer);
  attachFooterHandler(playlistPageDiv);

  const body = document.querySelector("#app");
  insertFragmentIntoElement(body, playlistPageDiv);
  footerUpdateAndRenderSong();
}

export async function loadPlaylistPage(): Promise<void> {
  state.openMenuCurrentPage = PageType.PLAYLIST;
  await playlistAction({ username: state.user.username });
  navigateTo(PageType.PLAYLIST);
}
