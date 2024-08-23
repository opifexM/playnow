import { DEFAULT_IMAGE } from "../../const.ts";
import { loadPlaylistCustomPage } from "../../page/playlist-custom-page/playlist-custom-page.ts";
import { state } from "../../store/state.ts";
import { PlaylistDto } from "../../type/playlist/playlist.dto.ts";
import { startAudioToggle } from "../footer/footer.ts";

export function getPlaylistList(playlists: PlaylistDto[]): string {
  const defaultImage = `img/${DEFAULT_IMAGE}`;

  const playlistList = playlists
    .map((playlist) => {
      const image = playlist.songs.length
        ? `img/${playlist.songs[0].image}`
        : defaultImage;

      const trackText = playlist.songs.length
        ? `${playlist.songs.length} tracks`
        : "No tracks";

      return `
        <li class="playlist__item"
            id="${playlist.id}"
        >
          <picture>
            <img class="playlist__img" src="${image}" alt="${playlist.name}">
          </picture>
          <div class="playlist__content">
            <h3 class="playlist__h3">
              <div class="playlist__h3__link">${playlist.name}</div>
            </h3>
            <span class="playlist__count">${trackText}</span>
          </div>
        </li>
      `;
    })
    .join("");

  return `
    <main class="main">
      <section class="playlist section tabs-content" data-target="playlists">
        <h2 class="playlist__h2 visually-hidden">Плейлисты</h2>
        <ul class="playlist__list">
          ${playlistList}
        </ul>
      </section>
    </main>
  `;
}

export function attachPlaylistListHandler(
  playlistPageDiv: HTMLDivElement,
): void {
  const listItems = playlistPageDiv.querySelectorAll(".playlist__item");
  listItems.forEach((item) => {
    const foundPlaylist = state.playlists.find(
      (playlist) => playlist.id === Number.parseInt(item.id),
    );

    item.addEventListener("click", async () => {
      if (foundPlaylist) {
        state.openMenuPlaylistId = foundPlaylist.id;
        const playlistSongs = foundPlaylist.songs;
        state.audioPlayer.loadNewTracks(playlistSongs);
        startAudioToggle();
        await loadPlaylistCustomPage();
      }
    });
  });
}
