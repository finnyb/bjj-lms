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

  constructor(props: Required<ServerStatus>) {
    Object.assign(this, props);
  }
}
