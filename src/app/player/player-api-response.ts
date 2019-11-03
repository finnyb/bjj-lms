import { Player } from './player';

interface PlayerProperties {
  playerindex: string;
  isplayer: boolean;
  model: string;
  connected: boolean;
  power: boolean;
  seq_no: string;
  modelname: string;
  name: string;
  canpoweroff: boolean;
  ip: string;
  isplaying: boolean;
  firmware: string;
  displaytype: string;
  uuid: string;
  playerid: string;
}

interface Result {
  count: number;
  players_loop: PlayerProperties[];
}

function mapPlayer(p: PlayerProperties): Player {
  return new Player({
    id: p.playerid,
    index: Number(p.playerindex),
    name: p.name,
    model: p.model,
    modelName: p.modelname,
    seqNo: Number(p.seq_no),
    canPoweroff: Boolean(p.canpoweroff),
    ip: p.ip,
    isPlayer: Boolean(p.isplayer),
    isPlaying: Boolean(p.isplaying),
    firmware: p.firmware,
    displayType: p.displaytype,
    uuid: p.uuid === null ? '' : p.uuid,
    power: Boolean(p.power),
    connected: Boolean(p.connected),
  });
}

export class PlayerApiResponse {
  result: Result;
}

export function mapPlayers(response: PlayerApiResponse): Player[] {
  return response.result.players_loop.map(p => mapPlayer(p));
}
