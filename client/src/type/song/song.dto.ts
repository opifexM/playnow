import { AlbumDto } from "../album/album.dto.ts";
import { ArtistDto } from "../artist/artist.dto.ts";
import { PlaylistDto } from "../playlist/playlist.dto.ts";
import { UserDto } from "../user/user.dto.ts";

export interface SongDto {
  id: number;
  name: string;
  filename: string;
  path: string;
  image: string;
  duration: number;
  createdAt: string;
  album: AlbumDto;
  artist: ArtistDto;
  playlists: PlaylistDto[];
  likes: UserDto[];
}
