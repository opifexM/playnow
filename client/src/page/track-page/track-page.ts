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
import {
  playlistAction,
  songsAction,
  userAction,
  userSongLikesAction,
} from "../../store/action.ts";
import { state } from "../../store/state.ts";
import { PageType } from "../../type/enum/page-type.enum.ts";

export function trackPage(): void {
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

  const matchingSearchSongs = state.songs.filter((song) =>
    song.name.toLowerCase().startsWith(state.searchParam),
  );
  const trackList = getTrackList(matchingSearchSongs, "Tracks");
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

export async function loadTrackPage(): Promise<void> {
  state.openMenuCurrentPage = PageType.TRACK;
  await userAction();
  await songsAction();
  await playlistAction({ username: state.user.username });
  await userSongLikesAction({ username: state.user.username });
  navigateTo(PageType.TRACK);
}
