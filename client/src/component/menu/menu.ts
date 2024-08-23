import { loadFavoritePage } from "../../page/favorite-page/favorite-page.ts";
import { loadPlaylistCustomPage } from "../../page/playlist-custom-page/playlist-custom-page.ts";
import { loadPlaylistPage } from "../../page/playlist-page/playlist-page.ts";
import { loadTrackPage } from "../../page/track-page/track-page.ts";
import { state } from "../../store/state.ts";
import { PageType } from "../../type/enum/page-type.enum.ts";

export function getMenu(): string {
  const playlistList = state.playlists
    .map((playlist) => {
      return `
        <li class="aside__item">
          <button class="playlist__menu-item aside__btn aside__tabs-btn ${state.openMenuCurrentPage === PageType.CUSTOM && state.openMenuPlaylistId === playlist.id ? "aside__btn-active" : ""}" 
                  data-path="tracks" 
                  id="${playlist.id}"
          >${playlist.name}
          </button>
        </li>
      `;
    })
    .join("");

  return `
    <aside class="aside">
      <h2 class="aside__h2 visually-hidden">Navigation</h2>
      <nav class="aside__nav">
        <button class="search__btn-open">
          <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 18C14.1944 18 18 14.1944 18 9.5C18 4.80558 14.1944 1 9.5 1C4.80558 1 1 4.80558 1 9.5C1 14.1944 4.80558 18 9.5 18Z" stroke="#AAAAAA" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <path d="M18.9999 19L15.5 15.5001" stroke="#AAAAAA" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
          </svg>
        </button>
        <ul class="aside__list">
          <li class="aside__item">
            <button class="aside__btn aside__tabs-btn ${state.openMenuCurrentPage === PageType.TRACK ? "aside__btn-active" : ""}" 
                    data-path="tracks" 
                    id="menu-tracks"
            >
              <svg fill="none" height="27" viewBox="0 0 25 27" width="25" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5 22C22.433 22 24 20.433 24 18.5C24 16.567 22.433 15 20.5 15C18.567 15 17 16.567 17 18.5C17 20.433 18.567 22 20.5 22Z" stroke="#FC6D3E" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                <path d="M4.5 26C6.433 26 8 24.433 8 22.5C8 20.567 6.433 19 4.5 19C2.567 19 1 20.567 1 22.5C1 24.433 2.567 26 4.5 26Z" stroke="#FC6D3E" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                <path d="M24 7L8 11" stroke="#FC6D3E" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                <path d="M8 22.5V5L24 1V18.5" stroke="#FC6D3E" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
              <span class="aside__btn__text">Tracks</span>
            </button>
          </li>
          <li class="aside__item">
            <button class="aside__btn aside__tabs-btn ${state.openMenuCurrentPage === PageType.PLAYLIST ? "aside__btn-active" : ""}"
                    data-path="playlists"
                    id="menu-playlists"
            >
              <svg fill="none" height="26" viewBox="0 0 22 26" width="22" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5185 12.1467L2.52146 1.14814C2.36988 1.0555 2.19634 1.00492 2.01872 1.00159C1.8411 0.998268 1.6658 1.04232 1.51085 1.12922C1.3559 1.21612 1.2269 1.34273 1.13711 1.49602C1.04733 1.64932 1 1.82376 1 2.00142V23.9986C1 24.1762 1.04733 24.3507 1.13711 24.504C1.2269 24.6573 1.3559 24.7839 1.51085 24.8708C1.6658 24.9577 1.8411 25.0017 2.01872 24.9984C2.19634 24.9951 2.36988 24.9445 2.52146 24.8519L20.5185 13.8533C20.6647 13.7639 20.7855 13.6386 20.8693 13.4891C20.9531 13.3397 20.9971 13.1713 20.9971 13C20.9971 12.8287 20.9531 12.6603 20.8693 12.5108C20.7855 12.3614 20.6647 12.2361 20.5185 12.1467Z" stroke="#FC6D3E" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
              <span class="aside__btn__text">Playlists</span>
            </button>
          </li>
          <li class="aside__item">
            <button class="aside__btn ${state.openMenuCurrentPage === PageType.FAVORITE ? "aside__btn-active" : ""}"
                    id="menu-favorite"
            >Favorite songs</button>
          </li>
          ${playlistList}
        </ul>
      </nav>
    </aside>
  `;
}

export function attachMenuHandler(menuDiv: HTMLDivElement): void {
  const menuTracksButton = menuDiv.querySelector(
    "#menu-tracks",
  ) as HTMLButtonElement;
  const menuPlaylistsButton = menuDiv.querySelector(
    "#menu-playlists",
  ) as HTMLButtonElement;
  const menuFavoriteButton = menuDiv.querySelector(
    "#menu-favorite",
  ) as HTMLButtonElement;

  const listItems = menuDiv.querySelectorAll(".playlist__menu-item");
  listItems.forEach((item) => {
    const foundPlaylist = state.playlists.find(
      (playlist) => playlist.id === Number.parseInt(item.id),
    );

    item.addEventListener("click", async () => {
      if (foundPlaylist) {
        state.openMenuPlaylistId = foundPlaylist.id;
        await loadPlaylistCustomPage();
      }
    });
  });

  if (menuTracksButton) {
    menuTracksButton.addEventListener("click", async () => {
      await loadTrackPage();
    });
  }
  if (menuPlaylistsButton) {
    menuPlaylistsButton.addEventListener("click", async () => {
      await loadPlaylistPage();
    });
  }
  if (menuFavoriteButton) {
    menuFavoriteButton.addEventListener("click", async () => {
      await loadFavoritePage();
    });
  }
}
