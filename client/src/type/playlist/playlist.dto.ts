import { SongDto } from "../song/song.dto.ts";
import { UserDto } from "../user/user.dto.ts";

export interface PlaylistDto {
  id: number;
  name: string;
  createdAt: Date;
  user: UserDto;
  songs: SongDto[];
}
