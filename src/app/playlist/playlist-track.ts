export class PlaylistTrack {
  playlistIndex: number;
  id: string;
  name: string;
  year: string;
  artist: string;
  artistId: string;
  num: string;
  album: string;
  albumId: string;
  type: string;
  bitrate: string;
  coverId: string;
  genre: string;
  genreId: string;

  constructor(props: Required<PlaylistTrack>) {
    Object.assign(this, props);
  }
}
