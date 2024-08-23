import { AudioPlayer } from "../service/audio-player.ts";
import { PageType } from "../type/enum/page-type.enum.ts";
import { PlaylistDto } from "../type/playlist/playlist.dto.ts";
import { SongDto } from "../type/song/song.dto.ts";
import { UserDto } from "../type/user/user.dto.ts";

interface State {
  user: UserDto;
  songs: SongDto[];
  playlists: PlaylistDto[];
  likes: SongDto[];
  openMenuCurrentPage: PageType;
  openMenuPlaylistId: number;
  modalSelectedSong: SongDto | null;
  modalSelectedPlaylist: PlaylistDto | null;
  playSong: SongDto | null;
  playSongList: SongDto[];
  searchParam: string;
  audioPlayer: AudioPlayer;
}

export const state: State = {
  user: {
    id: 0,
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    playlists: [],
    artistLikes: [],
    albumLikes: [],
    songLikes: [],
  },
  songs: [],
  playlists: [],
  likes: [],
  openMenuCurrentPage: PageType.TRACK,
  openMenuPlaylistId: 0,
  modalSelectedSong: null,
  modalSelectedPlaylist: null,
  playSong: null,
  playSongList: [],
  searchParam: "",
  audioPlayer: new AudioPlayer(),
};
