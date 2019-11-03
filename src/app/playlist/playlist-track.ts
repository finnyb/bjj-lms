interface PlaylistTrackConfig {
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
}

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

  constructor(config: PlaylistTrackConfig) {
    this.playlistIndex = config.playlistIndex;
    this.id = config.id;
    this.name = config.name;
    this.year = config.year;
    this.artist = config.artist;
    this.artistId = config.artistId;
    this.num = config.num;
    this.album = config.album;
    this.albumId = config.albumId;
    this.type = config.type;
    this.bitrate = config.bitrate;
    this.coverId = config.coverId;
    this.genre = config.genre;
    this.genreId = config.genreId;
  }
}
