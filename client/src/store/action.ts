import { ACCESS_KEY } from "../const.ts";
import { fetchData, HttpMethod } from "../service/api.ts";
import { NotificationType, sendNotify } from "../service/notify.ts";
import { saveToken } from "../service/token.ts";
import { PlaylistAddSongDto } from "../type/playlist/playlist-add-song.dto.ts";
import { PlaylistCreateDto } from "../type/playlist/playlist-create.dto.ts";
import { PlaylistFetchDto } from "../type/playlist/playlist-fetch.dto.ts";
import { PlaylistRemoveSongDto } from "../type/playlist/playlist-remove-song.dto.ts";
import { PlaylistDto } from "../type/playlist/playlist.dto.ts";
import { SongFetchLikeDto } from "../type/song/song-fetch-like.dto.ts";
import { SongLikeDto } from "../type/song/song-like.dto.ts";
import { SongUnlikeDto } from "../type/song/song-unlike.dto.ts";
import { SongDto } from "../type/song/song.dto.ts";
import { LoginDto } from "../type/user/login.dto.ts";
import { RegistrationDto } from "../type/user/registration.dto.ts";
import { TokenDto } from "../type/user/token.dto.ts";
import { UserLikeDto } from "../type/user/user-like.dto.ts";
import { UserDto } from "../type/user/user.dto.ts";
import { state } from "./state.ts";

export async function loginAction(data: LoginDto): Promise<void> {
  try {
    const userData = await fetchData<LoginDto, TokenDto>(
      "auth/login",
      HttpMethod.POST,
      data,
    );
    state.user.username = data.username;
    saveToken(ACCESS_KEY, userData.access_token);
    sendNotify(NotificationType.SUCCESS, `Login '${data.username}' successful`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendNotify(NotificationType.ERROR, `Login failed: ${error.message}`);
    } else {
      sendNotify(
        NotificationType.ERROR,
        "Login failed: An unknown error occurred",
      );
    }
    throw error;
  }
}

export async function registrationAction(data: RegistrationDto): Promise<void> {
  try {
    await fetchData<LoginDto, TokenDto>("auth/register", HttpMethod.POST, data);
    sendNotify(
      NotificationType.SUCCESS,
      `Register '${data.username}' successful`,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendNotify(NotificationType.ERROR, `Register failed: ${error.message}`);
    } else {
      sendNotify(
        NotificationType.ERROR,
        "Register failed: An unknown error occurred",
      );
    }
    throw error;
  }
}

export async function userAction(): Promise<void> {
  try {
    const users = await fetchData<void, UserDto[]>("users", HttpMethod.GET);
    const currentUser = users.find(
      (user) => user.username === state.user.username,
    );
    if (currentUser) {
      state.user.firstName = currentUser.firstName;
      state.user.lastName = currentUser.lastName;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendNotify(
        NotificationType.ERROR,
        `Failed to retrieve user information: ${error.message}`,
      );
    } else {
      sendNotify(NotificationType.ERROR, "Failed to retrieve user information");
    }
    throw error;
  }
}

export async function songsAction(): Promise<void> {
  try {
    state.songs = await fetchData<void, SongDto[]>("songs", HttpMethod.GET);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendNotify(
        NotificationType.ERROR,
        `Failed to retrieve songs information: ${error.message}`,
      );
    } else {
      sendNotify(
        NotificationType.ERROR,
        "Failed to retrieve songs information",
      );
    }
    throw error;
  }
}

export async function playlistAction(data: PlaylistFetchDto): Promise<void> {
  try {
    state.playlists = await fetchData<void, PlaylistDto[]>(
      `users/${data.username}/playlists`,
      HttpMethod.GET,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendNotify(
        NotificationType.ERROR,
        `Failed to retrieve playlists information: ${error.message}`,
      );
    } else {
      sendNotify(
        NotificationType.ERROR,
        "Failed to retrieve playlists information",
      );
    }
    throw error;
  }
}

export async function userSongLikesAction(
  data: SongFetchLikeDto,
): Promise<void> {
  try {
    const userLikeData = await fetchData<void, UserLikeDto>(
      `users/${data.username}/likes`,
      HttpMethod.GET,
    );
    state.likes = userLikeData.songLikes;
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendNotify(
        NotificationType.ERROR,
        `Failed to retrieve user song likes information: ${error.message}`,
      );
    } else {
      sendNotify(
        NotificationType.ERROR,
        "Failed to retrieve user song likes information",
      );
    }
    throw error;
  }
}

export async function createPlaylistAction(
  data: PlaylistCreateDto,
): Promise<void> {
  try {
    await fetchData<PlaylistCreateDto, PlaylistDto>(
      "playlists",
      HttpMethod.POST,
      { name: data.name },
    );
    sendNotify(
      NotificationType.SUCCESS,
      `Playlist '${data.name}' created successful`,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendNotify(
        NotificationType.ERROR,
        `Failed to create playlist '${data.name}': ${error.message}`,
      );
    } else {
      sendNotify(
        NotificationType.ERROR,
        `Failed to create playlist '${data.name}': An unknown error occurred`,
      );
    }
    throw error;
  }
}

export async function addSongToPlaylistAction(
  data: PlaylistAddSongDto,
): Promise<void> {
  try {
    await fetchData<void, PlaylistDto>(
      `playlists/${data.playlistId}/add/${data.songId}`,
      HttpMethod.POST,
    );
    sendNotify(
      NotificationType.SUCCESS,
      `Playlist #'${data.playlistId}' added song #'${data.songId}' successful`,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendNotify(
        NotificationType.ERROR,
        `Failed to added playlist #'${data.playlistId}' song #'${data.songId}': ${error.message}`,
      );
    } else {
      sendNotify(
        NotificationType.ERROR,
        `Failed to added playlist #'${data.playlistId}' song #'${data.songId}': An unknown error occurred`,
      );
    }
    throw error;
  }
}

export async function removeSongFromPlaylistAction(
  data: PlaylistRemoveSongDto,
): Promise<void> {
  try {
    await fetchData<void, PlaylistDto>(
      `playlists/${data.playlistId}/remove/${data.songId}`,
      HttpMethod.POST,
    );
    sendNotify(
      NotificationType.SUCCESS,
      `Playlist #'${data.playlistId}' removed song #'${data.songId}' successful`,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendNotify(
        NotificationType.ERROR,
        `Failed to remove playlist #'${data.playlistId}' song #'${data.songId}': ${error.message}`,
      );
    } else {
      sendNotify(
        NotificationType.ERROR,
        `Failed to remove playlist #'${data.playlistId}' song #'${data.songId}': An unknown error occurred`,
      );
    }
    throw error;
  }
}

export async function addLikeToSongAction(data: SongLikeDto): Promise<void> {
  try {
    await fetchData<void, PlaylistDto>(
      `songs/${data.songId}/like`,
      HttpMethod.POST,
    );
    sendNotify(
      NotificationType.SUCCESS,
      `Song #'${data.songId}' liked successful`,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendNotify(
        NotificationType.ERROR,
        `Failed to like song #'${data.songId}': ${error.message}`,
      );
    } else {
      sendNotify(
        NotificationType.ERROR,
        `Failed to like song #'${data.songId}': An unknown error occurred`,
      );
    }
    throw error;
  }
}

export async function removeLikeToSongAction(
  data: SongUnlikeDto,
): Promise<void> {
  try {
    await fetchData<void, PlaylistDto>(
      `songs/${data.songId}/unlike`,
      HttpMethod.POST,
    );
    sendNotify(
      NotificationType.SUCCESS,
      `Song #'${data.songId}' unliked successful`,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendNotify(
        NotificationType.ERROR,
        `Failed to unlike song #'${data.songId}': ${error.message}`,
      );
    } else {
      sendNotify(
        NotificationType.ERROR,
        `Failed to unlike song #'${data.songId}': An unknown error occurred`,
      );
    }
    throw error;
  }
}
