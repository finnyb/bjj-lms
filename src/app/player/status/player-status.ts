interface PlayerStatusConfig {
  name: string;
  volume: number;
  sequence: number;
  power: boolean;
  signalStrength: number;
  playlistTimestamp: number;
  digitalVolumeControl: boolean;
  ip: string;
  tracks: number;
  connected: boolean;
  shuffle: boolean;
  repeat: boolean;
  duration: number;
  playlistDuration: number;
  mode: Mode;
  playlistMode: string;
  currentIndex: number;
  time: number;
  rescanning: boolean;
}

export enum Mode {
  PLAYING,
  STOPPED,
  PAUSED,
}

export class PlayerStatus {
  public name: string;
  public volume: number;
  public sequence;
  public power: boolean;
  public signalStrength: number;
  public playlistTimestamp: number;
  public digitalVolumeControl: boolean;
  public ip: string;
  public tracks: number;
  public connected: boolean;
  public shuffle: boolean;
  public repeat: boolean;
  public duration: number;
  public playlistDuration: number;
  public mode: Mode;
  public playlistMode: string;
  public currentIndex: number;
  public time: number;
  public rescanning: boolean;
  public muted: boolean;

  constructor(config: PlayerStatusConfig) {
    this.name = config.name;
    this.volume = config.volume;
    this.sequence = config.sequence;
    this.power = config.power;
    this.signalStrength = config.signalStrength;
    this.playlistTimestamp = config.playlistTimestamp;
    this.digitalVolumeControl = config.digitalVolumeControl;
    this.ip = config.ip;
    this.tracks = config.tracks;
    this.connected = config.connected;
    this.shuffle = config.shuffle;
    this.repeat = config.repeat;
    this.duration = config.duration;
    this.playlistDuration = config.playlistDuration;
    this.mode = config.mode;
    this.playlistMode = config.playlistMode;
    this.currentIndex = config.currentIndex;
    this.time = config.time;
    this.rescanning = config.rescanning;
    this.muted = config.volume < 0;
  }

  percentComplete(): number {
    if (this.duration == null) {
      return 0;
    }

    return (this.time / this.duration) * 100;
  }
}
