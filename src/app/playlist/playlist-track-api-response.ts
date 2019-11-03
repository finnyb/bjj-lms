import { PlaylistTrack } from './playlist-track';
import { PlayerTracksResponse } from '../player/player-tracks-response';
import RequestUtils from '../request/request-utils';

interface PlaylistTrackProperties {
  'playlist index': number;
  id: string;
  title: string;
  artist: string;
  artist_id: string;
  album: string;
  album_id: string;
  year: string;
  tracknum: string;
  type: string;
  bitrate: string;
  coverid: string;
  genre: string;
  genre_id: string;
}

interface Result {
  playlist_tracks: number;
  playlist_loop: PlaylistTrackProperties[];
}

function mapTrack(t: PlaylistTrackProperties): PlaylistTrack {
  return new PlaylistTrack({
    playlistIndex: t['playlist index'],
    id: t.id.toString(),
    name: t.title,
    artist: t.artist,
    artistId: t.artist_id,
    year: t.year.toString(),
    num: t.tracknum,
    album: t.album,
    albumId: typeof t.album_id === 'undefined' ? '' : t.album_id.toString(),
    type: t.type === 'flc' ? 'flac' : t.type,
    bitrate: t.bitrate,
    coverId: t.coverid.toString(),
    genre: t.genre,
    genreId: typeof t.genre_id === 'undefined' ? '' : t.genre_id.toString(),
  });
}

function mapTracks(response: PlaylistTrackApiResponse): PlaylistTrack[] {
  if (response.result.playlist_loop) {
    return response.result.playlist_loop.map(p => mapTrack(p));
  } else {
    return [];
  }
}

export function mapPlaylist(
  response: PlaylistTrackApiResponse,
  start: number
): PlayerTracksResponse {
  return new PlayerTracksResponse(
    response.result.playlist_tracks,
    RequestUtils.CONSTANTS.DEFAULT_PAGE_LIMIT,
    start,
    mapTracks(response)
  );
}

export class PlaylistTrackApiResponse {
  result: Result;
}
