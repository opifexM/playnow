import { AlbumDto } from "../album/album.dto.ts";
import { ArtistDto } from "../artist/artist.dto.ts";
import { PlaylistDto } from "../playlist/playlist.dto.ts";
import { SongDto } from "../song/song.dto.ts";

export interface UserDto {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  playlists: PlaylistDto[];
  artistLikes: ArtistDto[];
  albumLikes: AlbumDto[];
  songLikes: SongDto[];
}
