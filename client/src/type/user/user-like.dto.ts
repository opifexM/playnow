import { AlbumDto } from "../album/album.dto.ts";
import { ArtistDto } from "../artist/artist.dto.ts";
import { SongDto } from "../song/song.dto.ts";

export interface UserLikeDto {
  artistLikes: ArtistDto[];
  albumLikes: AlbumDto[];
  songLikes: SongDto[];
}
