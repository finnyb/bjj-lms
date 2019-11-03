import { Album } from './album';

interface AlbumProperties {
  id: string;
  album: string;
  artist: string;
  artist_id: string;
  year: string;
  artwork_track_id: string;
}

interface Result {
  count: number;
  albums_loop: AlbumProperties[];
}

function mapAlbum(a: AlbumProperties): Album {
  return new Album({
    id: a.id.toString(),
    name: a.album,
    year: a.year.toString(),
    artist: a.artist,
    artistId: a.artist_id,
    artworkTrackId: a.artwork_track_id,
  });
}

export function mapAlbums(response: AlbumResponse): Album[] {
  if (response.result.count > 0) {
    return response.result.albums_loop.map(p => mapAlbum(p));
  } else {
    return [];
  }
}

export class AlbumResponse {
  result: Result;
}
