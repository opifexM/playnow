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
  attachTrackListHandler,
  getTrackList,
} from "../../component/track-list/track-list.ts";
import {
  insertFragmentIntoElement,
  insertHTMLIntoElement,
} from "../../dom/dom.ts";
import { navigateTo } from "../../service/navigation.ts";
import { playlistAction, userSongLikesAction } from "../../store/action.ts";
import { state } from "../../store/state.ts";
import { PageType } from "../../type/enum/page-type.enum.ts";

export function playlistCustomPage(): void {
  const trackPageDiv = document.createElement("div");
  trackPageDiv.classList.add("over-wrapper");
  trackPageDiv.style.position = "relative";
  trackPageDiv.style.overflow = "hidden";

  const header = getHeader();
  insertHTMLIntoElement(trackPageDiv, header);
  attachHeaderHandler(trackPageDiv);

  const contentWrap = document.createElement("div");
  contentWrap.classList.add("content-wrap", "flex");
  const leftMenu = getMenu();
  insertHTMLIntoElement(contentWrap, leftMenu);
  attachMenuHandler(contentWrap);

  const currentPlaylist = state.playlists.find(
    (playlist) => playlist.id === state.openMenuPlaylistId,
  );
  const playlistSongs = currentPlaylist?.songs ?? [];
  const matchingSearchSongs = playlistSongs.filter((song) =>
    song.name.toLowerCase().startsWith(state.searchParam),
  );
  const trackList = getTrackList(
    matchingSearchSongs,
    currentPlaylist?.name ?? "unknown",
  );
  insertHTMLIntoElement(contentWrap, trackList);
  insertFragmentIntoElement(trackPageDiv, contentWrap);
  attachTrackListHandler(trackPageDiv);

  const footer = getFooter();
  insertHTMLIntoElement(trackPageDiv, footer);
  attachFooterHandler(trackPageDiv);

  const body = document.querySelector("#app");
  insertFragmentIntoElement(body, trackPageDiv);
  footerUpdateAndRenderSong();
}

export async function loadPlaylistCustomPage(): Promise<void> {
  state.openMenuCurrentPage = PageType.CUSTOM;
  await playlistAction({ username: state.user.username });
  await userSongLikesAction({ username: state.user.username });
  navigateTo(PageType.CUSTOM);
}
