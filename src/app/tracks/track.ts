export class Track {
  id: string;
  name: string;
  year: string;
  artist: string;
  num: string;
  album: string;
  albumId: string;
  type: string;
  bitrate: string;
  artworkTrackId: string;

  constructor(props: Required<Track>) {
    Object.assign(this, props);
  }
}
