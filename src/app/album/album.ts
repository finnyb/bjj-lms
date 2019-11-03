interface AlbumConfig {
  id: string;
  name: string;
  year: string;
  artist: string;
  artistId: string;
  artworkTrackId: string;
}

export class Album {
  id: string;
  name: string;
  year: string;
  artist: string;
  artistId: string;
  artworkTrackId: string;

  constructor(config: AlbumConfig) {
    this.id = config.id;
    this.name = config.name;
    this.year = config.year;
    this.artist = config.artist;
    this.artistId = config.artistId;
    this.artworkTrackId = config.artworkTrackId;
  }
}
