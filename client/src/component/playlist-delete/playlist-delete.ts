import { loadTrackPage } from "../../page/track-page/track-page.ts";
import { removeSongFromPlaylistAction } from "../../store/action.ts";
import { state } from "../../store/state.ts";

export function getPlaylistDelete(): string {
  return `
    <div class="playlists-modal">
        <div class="playlists-modal__title">
            Delete song '${state.modalSelectedSong?.name}' from playlist '${state.modalSelectedPlaylist?.name}'?
        </div>
        <div class="playlists-modal__footer">
            <div
                id="delete-button" 
            >
                Delete
            </div>            
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

export function attachPlaylistDeleteHandler(playlistDiv: HTMLDivElement): void {
  const cancelButton = playlistDiv.querySelector(
    "#cancel-button",
  ) as HTMLButtonElement;
  const deleteButton = playlistDiv.querySelector(
    "#delete-button",
  ) as HTMLButtonElement;

  if (deleteButton) {
    deleteButton.addEventListener("click", async () => {
      deleteButton.disabled = true;
      try {
        if (state.modalSelectedSong && state.modalSelectedPlaylist) {
          await removeSongFromPlaylistAction({
            playlistId: state.modalSelectedPlaylist.id,
            songId: state.modalSelectedSong.id,
          });
          await loadTrackPage();
        }
      } catch (e) {
      } finally {
        deleteButton.disabled = false;
      }
    });
  }
  if (cancelButton) {
    cancelButton.addEventListener("click", async () => {
      state.modalSelectedPlaylist = null;
      await loadTrackPage();
    });
  }
}
