import { Artist } from './artist';

export class ArtistResponse {
  artists: Array<Artist>;
  count: number;
  pageCount: number;
  pageSize: number;
  startingPage: number;

  constructor(
    count: number,
    pageLimit: number,
    start: number,
    artists: Array<Artist>
  ) {
    this.artists = artists;
    this.count = count;
    this.pageSize = pageLimit;
    this.pageCount =
      count === 0 ? 0 : Math.floor(pageLimit > count ? 1 : count / pageLimit);
    this.startingPage = Math.floor(pageLimit > start ? 0 : start / pageLimit);
  }
}
