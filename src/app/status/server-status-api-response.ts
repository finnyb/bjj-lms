import { ServerStatus } from './server-status';

interface ServerStatusProperties {
  lastscan: number;
  'info total songs': number;
  'info total artists': number;
  'info total albums': number;
  'info total genres': number;
  'info total duration': number;
  'player count': number;
  version: string;
  uuid: string;
  mac: string;
}

export class ServerStatusApiResponse {
  result: ServerStatusProperties;
}

export function mapStatus(r: ServerStatusApiResponse): ServerStatus {
  const status = r.result;
  return new ServerStatus({
    lastScan: Number(status.lastscan),
    totalSongs: status['info total songs'],
    totalArtists: status['info total artists'],
    totalAlbums: status['info total albums'],
    totalGenres: status['info total genres'],
    totalDuration: Math.trunc(status['info total duration']),
    playerCount: status['player count'],
    version: status.version,
    uuid: status.uuid,
    mac: status.mac,
  });
}
