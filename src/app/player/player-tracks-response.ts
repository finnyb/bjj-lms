import { PlaylistTrack } from '../playlist/playlist-track';

export class PlayerTracksResponse {
  tracks: Array<PlaylistTrack>;
  count: number;
  pageCount: number;
  pageSize: number;
  startingPage: number;

  constructor(
    count: number,
    pageLimit: number,
    start: number,
    tracks: Array<PlaylistTrack>
  ) {
    this.tracks = tracks;
    this.count = count;
    this.pageSize = pageLimit;
    this.pageCount =
      count === 0 ? 0 : Math.floor(pageLimit > count ? 1 : count / pageLimit);
    this.startingPage = Math.floor(pageLimit > start ? 0 : start / pageLimit);
  }
}
