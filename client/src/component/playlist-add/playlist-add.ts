import { DEFAULT_IMAGE } from "../../const.ts";
import { refreshCurrentPage } from "../../service/navigation.ts";
import {
  addSongToPlaylistAction,
  createPlaylistAction,
} from "../../store/action.ts";
import { state } from "../../store/state.ts";

export function getPlaylistAdd(): string {
  const defaultImage = `img/${DEFAULT_IMAGE}`;

  const playlistList = state.playlists
    .map((playlist) => {
      const image = playlist.songs.length
        ? `img/${playlist.songs[0].image}`
        : defaultImage;

      const trackText = playlist.songs.length
        ? `${playlist.songs.length} tracks`
        : "No tracks";

      return `
        <div 
          class="playlists-modal__playlist"
          id="${playlist.id}"
        >
            <img 
                  src="${image}" 
                  alt="${playlist.name}" 
                  class="playlists-modal__playlist__image"
            />
            <div class="playlists-modal__playlist__title">${playlist.name}</div>
            <div class="playlists-modal__playlist__info">${trackText}</div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="playlists-modal">
        <div class="playlists-modal__title">
            Add song '${state.modalSelectedSong?.name}' to playlist
        </div>
        <div class="playlists-modal__playlist_content">
            <div class="playlists-modal__playlist__input-container">
              <input 
                type="text" 
                placeholder="Input new name" 
                class="playlists-modal__playlist__input" 
                id="name" 
              />
              <button 
                id="create-button" 
                class="playlists-modal__playlist__create-btn"
              >
                Create
              </button>
            </div>
            ${playlistList}
        </div>
        <div class="playlists-modal__footer">
            <div
                id="cancel-button" 
                class="playlists-modal__close-btn"
            >
                Cancel
            </div>
        </div>
    </div>
  `;
}

export function attachPlaylistAddHandler(playlistDiv: HTMLDivElement): void {
  const cancelButton = playlistDiv.querySelector(
    "#cancel-button",
  ) as HTMLButtonElement;
  const createButton = playlistDiv.querySelector(
    "#create-button",
  ) as HTMLButtonElement;
  const nameInput = playlistDiv.querySelector("#name") as HTMLInputElement;

  const listItems = playlistDiv.querySelectorAll(".playlists-modal__playlist");
  listItems.forEach((item) => {
    item.addEventListener("click", async () => {
      if (state.modalSelectedSong && item.id) {
        await addSongToPlaylistAction({
          playlistId: Number.parseInt(item.id),
          songId: state.modalSelectedSong.id,
        });
        await refreshCurrentPage();
      }
    });
  });

  if (nameInput && createButton) {
    createButton.addEventListener("click", async () => {
      createButton.disabled = true;
      try {
        await createPlaylistAction({ name: nameInput.value });
        await refreshCurrentPage();
      } catch (e) {
      } finally {
        createButton.disabled = false;
      }
    });
  }
  if (cancelButton) {
    cancelButton.addEventListener("click", async () => {
      await refreshCurrentPage();
    });
  }
}
