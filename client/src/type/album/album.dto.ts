import { ArtistDto } from "../artist/artist.dto.ts";
import { SongDto } from "../song/song.dto.ts";
import { UserDto } from "../user/user.dto.ts";

export interface AlbumDto {
  id: number;
  name: string;
  image: string;
  createdAt: Date;
  songs: SongDto[];
  artist: ArtistDto;
  likes: UserDto[];
}
