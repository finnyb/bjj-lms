interface TrackConfig {
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
}

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

  constructor(config: TrackConfig) {
    this.id = config.id;
    this.name = config.name;
    this.year = config.year;
    this.artist = config.artist;
    this.num = config.num;
    this.album = config.album;
    this.albumId = config.albumId;
    this.type = config.type;
    this.bitrate = config.bitrate;
    this.artworkTrackId = config.artworkTrackId;
  }
}
