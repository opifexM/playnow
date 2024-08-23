import { AlbumDto } from "../album/album.dto.ts";
import { UserDto } from "../user/user.dto.ts";

export interface ArtistDto {
  id: number;
  name: string;
  image: string;
  createdAt: Date;
  albums: AlbumDto[];
  likes: UserDto[];
}
