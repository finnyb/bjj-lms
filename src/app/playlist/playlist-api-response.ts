interface Result {
  count: number;
}

export function mapPlaylist(response: PlaylistApiResponse): number {
  return response.result.count;
}

export class PlaylistApiResponse {
  result: Result;
}
