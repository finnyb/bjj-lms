import { Injectable } from '@angular/core';
import { Mode, PlayerStatus } from './player-status';
import * as _ from 'lodash';
import { PlayerStatusResponse } from './player-status-response';

@Injectable({
  providedIn: 'root',
})
export class PlayerStatusResponseService {
  constructor() {}

  mapPlayerStatus(r: PlayerStatusResponse): PlayerStatus {
    const p = r.result;
    return new PlayerStatus({
      name: _.isNil(p.player_name) ? '' : p.player_name,
      signalStrength: Number(isNaN(p.signalstrength) ? 0 : p.signalstrength),
      time: Number(isNaN(p.time) ? 0 : Math.round(p.time)),
      currentIndex: Number(
        isNaN(p.playlist_cur_index) ? 0 : p.playlist_cur_index
      ),
      playlistMode:
        typeof p['playlist mode'] === 'undefined' ? 'off' : p['playlist mode'],
      mode: this.lookupMode(p.mode),
      duration: Number(isNaN(p.duration) ? 0 : Math.round(p.duration)),
      playlistDuration: Number(
        isNaN(p['playlist duration']) ? 0 : Math.round(p['playlist duration'])
      ),
      repeat: Boolean(p['playlist repeat']),
      shuffle: Boolean(p['playlist shuffle']),
      connected: Boolean(p.player_connected),
      tracks: Number(
        typeof p.playlist_tracks === 'undefined' ? 0 : p.playlist_tracks
      ),
      digitalVolumeControl: Boolean(p.digital_volume_control),
      playlistTimestamp: Number(
        typeof p.playlist_timestamp === 'undefined' ? 0 : p.playlist_timestamp
      ),
      rescanning: Boolean(p.rescan == null ? 0 : p.rescan),
      volume: Number(
        typeof p['mixer volume'] === 'undefined' ? 0 : p['mixer volume']
      ),
      ip: typeof p.player_ip === 'undefined' ? '0.0.0.0' : p.player_ip,
      power: Boolean(p.power),
      sequence: Number(typeof p.seq_no === 'undefined' ? 0 : p.seq_no),
    });
  }

  private lookupMode(mode: string): Mode {
    switch (mode) {
      case 'play':
        return Mode.PLAYING;
      case 'stop':
        return Mode.STOPPED;
      case 'pause':
        return Mode.PAUSED;
      default:
        return Mode.STOPPED;
    }
  }
}
