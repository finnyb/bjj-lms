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

  constructor(props: Required<Player>) {
    Object.assign(this, props);
  }
}
