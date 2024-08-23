import { loadPlaylistAddPage } from "../../page/playlist-add-page/playlist-add-page.ts";
import { loadPlaylistDeletePage } from "../../page/playlist-delete-page/playlist-delete-page.ts";
import { refreshCurrentPage } from "../../service/navigation.ts";
import { daysSince, secondsToMinutesAndSeconds } from "../../service/util.ts";
import {
  addLikeToSongAction,
  removeLikeToSongAction,
} from "../../store/action.ts";
import { state } from "../../store/state.ts";
import { SongDto } from "../../type/song/song.dto.ts";
import { startAudioToggle } from "../footer/footer.ts";

export function getTrackList(songs: SongDto[], title: string): string {
  const songList = songs
    .map((song) => {
      const isLiked = state.likes.some((like) => like.id === song.id);

      return `
        <li class="tracks__item flex" id="${song.id}">
          <div class="tracks__item__number">${song.id}</div>
            <div class="tracks__item__name">
              <img 
                alt="${song.name}" 
                class="track__img" 
                src="img/${song.image}"
              >
              <div class="track__content">
                <h3 class="track__name"><a class="track__name__link" href="#">${song.name}</a></h3>
                <span class="track__author">${song.artist.name}</span>
              </div>
            </div>
            <div class="tracks__item__albom">${song.album.name}</div>
            <div class="tracks__item__data flex">
              <span class="data__text">${daysSince(song.createdAt)} days ago</span>
              <button class="track__like-btn ${isLiked ? "like-btn--active" : ""}">
                <svg fill="none" height="18" viewBox="0 0 22 18" width="22" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5022 8.2786e-06C14.6291 -0.00149138 13.7677 0.200775 12.9865 0.590718C12.2052 0.980661 11.5258 1.54752 11.0022 2.24621C10.293 1.30266 9.30512 0.606001 8.17823 0.254823C7.05134 -0.0963541 5.84256 -0.0842713 4.72291 0.289363C3.60327 0.662997 2.62948 1.37926 1.93932 2.3368C1.24916 3.29434 0.877596 4.44467 0.877197 5.62501C0.877197 12.3621 10.2373 17.6813 10.6357 17.9044C10.7477 17.9671 10.8739 18 11.0022 18C11.1305 18 11.2567 17.9671 11.3687 17.9044C13.0902 16.8961 14.7059 15.7173 16.1914 14.3856C19.4665 11.438 21.1272 8.49047 21.1272 5.62501C21.1255 4.13368 20.5323 2.70393 19.4778 1.6494C18.4233 0.594873 16.9935 0.00169855 15.5022 8.2786e-06V8.2786e-06Z" fill="#FC6D3E"></path>
                </svg>
              </button>
            </div>
            <time class="tracks__item__time">${secondsToMinutesAndSeconds(song.duration)}</time>
          <div class="tracks__item__drop">
            <button 
              class="track__btn-dropdown"
              id="${song.id}"
            >
              <svg fill="none" height="4" viewBox="0 0 23 4" width="23" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2" cy="2" fill="#C4C4C4" r="2"></circle>
                <circle cx="11.5" cy="2" fill="#C4C4C4" r="2"></circle>
                <circle cx="21" cy="2" fill="#C4C4C4" r="2"></circle>
              </svg>
            </button>
          </div>
        </li>
      `;
    })
    .join("");

  return `
  <main class="main">
        <section class="tracks section tabs-content section--active" data-target="tracks">
          <h2 class="tracks__h2 title__h2">${title}</h2>
          <div class="tracks__content">
            <div class="tracks__header flex">
              <div class="tracks__header__number">#</div>
              <div class="tracks__header__name">NAME</div>
              <div class="tracks__header__albom">Album</div>
              <div class="tracks__header__data">
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 1.5H1C0.723858 1.5 0.5 1.72386 0.5 2V12C0.5 12.2761 0.723858 12.5 1 12.5H11C11.2761 12.5 11.5 12.2761 11.5 12V2C11.5 1.72386 11.2761 1.5 11 1.5Z" stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M9 0.5V2.5" stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M3 0.5V2.5" stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M0.5 4.5H11.5" stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
              <div class="tracks__header__time">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="#A4A4A4" stroke-miterlimit="10"></path>
                  <path d="M7 3.5V7H10.5" stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
            </div>
            <ul class="tracks__list">
              ${songList}
            </ul>
          </div>
        </section>
      </main>
  `;
}

function closeAllMenus(): void {
  document
    .querySelectorAll(".track__dropdown")
    .forEach((menu) => menu.remove());
}

function toggleMenu(dropdownButton: Element, clickSong: SongDto): void {
  const menu = document.createElement("div");
  menu.classList.add("track__dropdown");

  const playlist = state.playlists.find((playlist) =>
    playlist.songs.some((song) => song.id === clickSong.id),
  );
  if (playlist) {
    state.modalSelectedPlaylist = playlist;
  } else {
    state.modalSelectedPlaylist = null;
  }

  const addPlaylistButton = document.createElement("button");
  addPlaylistButton.classList.add("track__add-btn");
  addPlaylistButton.textContent = "Add song to playlist";
  addPlaylistButton.disabled = !!playlist;
  menu.appendChild(addPlaylistButton);

  const deletePlaylistButton = document.createElement("button");
  deletePlaylistButton.classList.add("track__delete-btn");
  deletePlaylistButton.textContent = "Delete song from playlist";
  deletePlaylistButton.disabled = !playlist;
  menu.appendChild(deletePlaylistButton);

  menu.appendChild(deletePlaylistButton);
  dropdownButton.appendChild(menu);

  menu.querySelector(".track__add-btn")?.addEventListener("click", () => {
    closeAllMenus();
    loadPlaylistAddPage();
  });

  menu.querySelector(".track__delete-btn")?.addEventListener("click", () => {
    closeAllMenus();
    loadPlaylistDeletePage();
  });
}

export async function toggleLike(clickSong: SongDto): Promise<void> {
  const isLiked = state.likes.some((like) => like.id === clickSong.id);
  if (!isLiked) {
    await addLikeToSongAction({
      songId: clickSong.id,
    });
  } else {
    await removeLikeToSongAction({
      songId: clickSong.id,
    });
  }
  await refreshCurrentPage();
}

export function attachTrackListHandler(trackPageDiv: HTMLDivElement): void {
  const dropdownButtonSelector = ".track__btn-dropdown";
  const listItems = trackPageDiv.querySelectorAll(".tracks__item");

  listItems.forEach((item) => {
    const foundSong = state.songs.find(
      (song) => song.id === Number.parseInt(item.id),
    );

    const dropdownButton = item.querySelector(dropdownButtonSelector);
    if (dropdownButton && foundSong) {
      dropdownButton.addEventListener("click", () => {
        toggleMenu(dropdownButton, foundSong);
      });
    }

    const likeButton = item.querySelector(".track__like-btn");
    if (likeButton && foundSong) {
      likeButton.addEventListener("click", () => {
        toggleLike(foundSong);
      });
    }

    item.addEventListener("click", async (event) => {
      if (
        foundSong &&
        (event.target as HTMLElement).tagName.toLowerCase() === "a"
      ) {
        state.playSong = foundSong;
        state.audioPlayer.loadNewTracks([state.playSong]);
        startAudioToggle();
        await refreshCurrentPage();
      }

      if (foundSong) {
        state.modalSelectedSong = foundSong;
      } else {
        state.modalSelectedSong = null;
      }
    });
  });

  const mainDiv = trackPageDiv.querySelector(".main");
  if (mainDiv) {
    mainDiv.addEventListener("click", (event) => {
      if (!(event.target as HTMLElement).closest(dropdownButtonSelector)) {
        closeAllMenus();
      }
    });
  }
}
