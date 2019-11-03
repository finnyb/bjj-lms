interface PlayerStatusProperties {
  power: number;
  player_name: string;
  rate: number;
  digital_volume_control: number;
  time: number;
  playlist_timestamp: number;
  can_seek: number;
  'playlist shuffle': number;
  'playlist repeat': number;
  playlist_tracks: number;
  'mixer volume': number;
  mode: string;
  playlist_cur_index: number;
  player_ip: string;
  'playlist duration': number;
  seq_no: string;
  signalstrength: number;
  duration: number;
  'playlist mode': string;
  player_connected: number;
  rescan: number;
}

export class PlayerStatusResponse {
  result: PlayerStatusProperties;
}
