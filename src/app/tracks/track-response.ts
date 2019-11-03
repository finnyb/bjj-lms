import { Track } from './track';

interface TrackProperties {
  id: string;
  title: string;
  artist: string;
  album: string;
  album_id: string;
  year: string;
  tracknum: string;
  type: string;
  bitrate: string;
  artwork_track_id: string;
}

interface Result {
  count: number;
  titles_loop: TrackProperties[];
}

function mapTrack(t: TrackProperties): Track {
  return new Track({
    id: typeof t.id === 'undefined' || t.id == null ? '' : t.id.toString(),
    name: t.title,
    artist: t.artist,
    year: t.year == null ? '' : t.year.toString(),
    num: t.tracknum,
    album: t.album,
    albumId: t.album_id == null ? '' : t.album_id.toString(),
    type: t.type === 'flc' ? 'flac' : t.type,
    bitrate: t.bitrate,
    artworkTrackId:
      t.artwork_track_id == null ? '' : t.artwork_track_id.toString(),
  });
}

export function mapTracks(response: TrackResponse): Track[] {
  if (response.result.count > 0) {
    return response.result.titles_loop.map(p => mapTrack(p));
  } else {
    return [];
  }
}

export class TrackResponse {
  result: Result;
}
