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

  constructor(props: Partial<PlayerStatus>) {
    Object.assign(this, props);
    this.muted = this.volume < 0;
  }

  percentComplete(): number {
    if (this.duration == null) {
      return 0;
    }

    return (this.time / this.duration) * 100;
  }
}
