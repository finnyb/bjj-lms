interface ServerStatusConfig {
  lastScan: number;
  totalSongs: number;
  totalAlbums: number;
  totalArtists: number;
  totalGenres: number;
  totalDuration: number;
  playerCount: number;
  version: string;
  uuid: string;
  mac: string;
}

export class ServerStatus {
  public lastScan: number;
  public totalSongs: number;
  public totalAlbums: number;
  public totalArtists: number;
  public totalGenres: number;
  public totalDuration: number;
  public playerCount: number;
  public version: string;
  public uuid: string;
  public mac: string;

  constructor(config: ServerStatusConfig) {
    this.lastScan = config.lastScan;
    this.totalSongs = config.totalSongs;
    this.totalAlbums = config.totalAlbums;
    this.totalArtists = config.totalArtists;
    this.totalGenres = config.totalGenres;
    this.totalDuration = config.totalDuration;
    this.playerCount = config.playerCount;
    this.version = config.version;
    this.uuid = config.uuid;
    this.mac = config.mac;
  }
}
