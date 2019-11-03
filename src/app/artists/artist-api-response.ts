import { Artist } from './artist';
import { Navigation } from '../navigations/navigation';
import { ArtistResponse } from './artist-response';
import RequestUtils from '../request/request-utils';

interface ArtistProperties {
  textkey: string;
  id: string;
  artist: string;
}

interface Result {
  count: number;
  artists_loop: ArtistProperties[];
}

function mapArtist(a: ArtistProperties): Artist {
  return new Artist({
    id: a.id.toString(),
    name: a.artist,
    index: a.textkey,
  });
}

export function mapArtists(
  response: ArtistApiResponse,
  start: number
): ArtistResponse {
  if (response.result.count > 0) {
    return new ArtistResponse(
      response.result.count,
      RequestUtils.CONSTANTS.DEFAULT_PAGE_LIMIT,
      start,
      response.result.artists_loop.map(p => mapArtist(p))
    );
  } else {
    return new ArtistResponse(
      0,
      RequestUtils.CONSTANTS.DEFAULT_PAGE_LIMIT,
      0,
      []
    );
  }
}

export class ArtistApiResponse {
  result: Result;
}

interface NavigationProperty {
  [key: string]: number;

  start: number;
}

interface ResultNavigation {
  count: number;
  indexList: NavigationProperty[];
}

export class ArtistNavigationResponse {
  result: ResultNavigation;
}

function mapNavigation(
  n: NavigationProperty,
  index: number,
  navs: NavigationProperty[]
): Navigation {
  let start = 0;
  const count = n[1];

  if (index > 0) {
    start = navs[index - 1].start + navs[index - 1][1];
  }

  navs[index].start = start;

  return new Navigation({
    index: n[0].toString(),
    start: start,
    count: count,
    url: `/artists/${n[0].toString()}`,
  });
}

export function mapNavigations(
  response: ArtistNavigationResponse
): Navigation[] {
  return response.result.indexList.map((n, index, navs) =>
    mapNavigation(n, index, navs)
  );
}
