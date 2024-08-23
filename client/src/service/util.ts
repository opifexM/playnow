export function daysSince(dateString: string): number {
  const differenceInMs = new Date().getTime() - new Date(dateString).getTime();

  return Math.round(differenceInMs / (1000 * 60 * 60 * 24));
}

export function secondsToMinutesAndSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${minutes}:${formattedSeconds}`;
}
