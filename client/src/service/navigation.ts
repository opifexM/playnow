import {
  favoritePage,
  loadFavoritePage,
} from "../page/favorite-page/favorite-page.ts";
import { loginPage } from "../page/login-page/login-page.ts";
import { playlistAddPage } from "../page/playlist-add-page/playlist-add-page.ts";
import {
  loadPlaylistCustomPage,
  playlistCustomPage,
} from "../page/playlist-custom-page/playlist-custom-page.ts";
import { playlistDeletePage } from "../page/playlist-delete-page/playlist-delete-page.ts";
import {
  loadPlaylistPage,
  playlistPage,
} from "../page/playlist-page/playlist-page.ts";
import { registrationPage } from "../page/registration-page/registration-page.ts";
import { loadTrackPage, trackPage } from "../page/track-page/track-page.ts";
import { state } from "../store/state.ts";
import { PageType } from "../type/enum/page-type.enum.ts";

export type PageHandlers = {
  [key in PageType]: (body: Element) => void;
};

const pageHandlers: PageHandlers = {
  [PageType.LOGIN]: loginPage,
  [PageType.REGISTRATION]: registrationPage,
  [PageType.PLAYLIST]: playlistPage,
  [PageType.PLAYLIST_ADD]: playlistAddPage,
  [PageType.PLAYLIST_DELETE]: playlistDeletePage,
  [PageType.TRACK]: trackPage,
  [PageType.FAVORITE]: favoritePage,
  [PageType.CUSTOM]: playlistCustomPage,
};

export function navigateTo(page: PageType, isModal = false): void {
  const body = document.querySelector("#app");
  if (!body) {
    throw new Error("Error load page");
  }
  if (!isModal) {
    body.innerHTML = "";
  }

  const handler = pageHandlers[page];
  if (handler) {
    handler(body);
  } else {
    console.error(`No handler for page type: ${page}`);
  }
}

export async function refreshCurrentPage(): Promise<void> {
  switch (state.openMenuCurrentPage) {
    case PageType.TRACK: {
      await loadTrackPage();
      break;
    }
    case PageType.PLAYLIST: {
      await loadPlaylistPage();
      break;
    }
    case PageType.FAVORITE: {
      await loadFavoritePage();
      break;
    }
    case PageType.CUSTOM: {
      await loadPlaylistCustomPage();
      break;
    }
  }
}
