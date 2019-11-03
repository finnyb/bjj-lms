interface PlayerConfig {
  id: string;
  name: string;
  seqNo: number;
  canPoweroff: boolean;
  firmware: string;
  isPlayer: boolean;
  displayType: string;
  isPlaying: boolean;
  connected: boolean;
  modelName: string;
  ip: string;
  uuid: string;
  index: number;
  power: boolean;
  model: string;
}

export class Player {
  id: string;
  name: string;
  seqNo: number;
  canPoweroff: boolean;
  firmware: string;
  isPlayer: boolean;
  displayType: string;
  isPlaying: boolean;
  connected: boolean;
  modelName: string;
  ip: string;
  uuid: string;
  index: number;
  power: boolean;
  model: string;

  constructor(config: PlayerConfig) {
    this.id = config.id;
    this.name = config.name;
    this.seqNo = config.seqNo;
    this.canPoweroff = config.canPoweroff;
    this.firmware = config.firmware;
    this.isPlayer = config.isPlayer;
    this.displayType = config.displayType;
    this.isPlaying = config.isPlaying;
    this.connected = config.connected;
    this.modelName = config.modelName;
    this.ip = config.ip;
    this.uuid = config.uuid;
    this.index = config.index;
    this.power = config.power;
    this.model = config.model;
  }
}
