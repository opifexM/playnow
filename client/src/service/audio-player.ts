import { SongDto } from "../type/song/song.dto.ts";

export class AudioPlayer {
  private readonly audioElement: HTMLAudioElement = new Audio();
  private audioContext: AudioContext | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private currentIndex: number = 0;
  private trackList: SongDto[] = [];
  private isShuffled: boolean = false;
  private isRepeating: boolean = false;
  private previousVolume: number = 1;
  private handleTrackProgressBar: (() => void) | null = null;
  private handleTrackInfo: (() => void) | null = null;

  private createAudioContext(
    handleTrackProgressBar: () => void,
    handleTrackInfo: () => void,
  ): void {
    if (!this.audioContext) {
      this.handleTrackProgressBar = handleTrackProgressBar;
      this.handleTrackInfo = handleTrackInfo;

      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.sourceNode = this.audioContext.createMediaElementSource(
        this.audioElement,
      );
      this.sourceNode
        .connect(this.gainNode)
        .connect(this.audioContext.destination);

      this.audioElement.addEventListener("ended", () => this.handleTrackEnd());

      this.audioElement.addEventListener("timeupdate", () => {
        const currentTime = this.getCurrentTime();
        const duration = this.getDurationTime();
        if (currentTime && duration) {
          if (this.handleTrackProgressBar) {
            this.handleTrackProgressBar();
          }
        }
      });
    }
  }

  private loadTrack(index: number): void {
    if (index >= 0 && index < this.trackList.length) {
      this.audioElement.src = this.trackList[index].path;
    }
  }

  public play(): void {
    if (this.handleTrackInfo) {
      this.handleTrackInfo();
    }
    this.audioElement.play();
  }

  public pause(): void {
    this.audioElement.pause();
  }

  public togglePlayPause(
    handleTrackProgressBar: () => void,
    handleTrackInfo: () => void,
  ): void {
    this.createAudioContext(handleTrackProgressBar, handleTrackInfo);
    if (this.audioElement.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  public stop(): void {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }

  public nextTrack(): void {
    if (this.currentIndex < this.trackList.length - 1) {
      this.currentIndex++;
      this.loadTrack(this.currentIndex);
      this.play();
    }
  }

  public previousTrack(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadTrack(this.currentIndex);
      this.play();
    }
  }

  public shuffle(): void {
    if (this.isShuffled) {
      this.trackList.sort();
    } else {
      this.trackList = this.trackList
        .slice(0, this.currentIndex + 1)
        .concat(
          this.trackList
            .slice(this.currentIndex + 1)
            .sort(() => Math.random() - 0.5),
        );
    }
    this.isShuffled = !this.isShuffled;
  }

  public toggleRepeat(): void {
    this.isRepeating = !this.isRepeating;
  }

  public setVolume(value: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = value;
      if (value > 0) {
        this.previousVolume = value;
      }
    }
  }

  public toggleMute(): void {
    if (this.gainNode) {
      if (this.gainNode.gain.value > 0) {
        this.previousVolume = this.gainNode.gain.value;
        this.setVolume(0);
      } else {
        this.setVolume(this.previousVolume);
      }
    }
  }

  public getCurrentTime(): number {
    return Math.ceil(this.audioElement.currentTime);
  }

  public getDurationTime(): number {
    return Math.ceil(this.audioElement.duration);
  }

  public loadNewTracks(newTrackList: SongDto[], startIndex: number = 0): void {
    this.trackList = newTrackList;
    this.currentIndex =
      startIndex >= 0 && startIndex < newTrackList.length ? startIndex : 0;
    this.loadTrack(this.currentIndex);
  }

  public handleTrackEnd(): void {
    if (this.isRepeating) {
      this.play();
    } else if (this.currentIndex < this.trackList.length - 1) {
      this.nextTrack();
    } else {
      this.stop();
    }
  }

  public getCurrentSong(): SongDto | null {
    if (!this.trackList.length) {
      return null;
    }

    return this.trackList[this.currentIndex];
  }
}
