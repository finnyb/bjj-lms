export class Album {
  id: string;
  name: string;
  year: string;
  artist: string;
  artistId: string;
  artworkTrackId: string;

  constructor(props: Required<Album>) {
    Object.assign(this, props);
  }
}
