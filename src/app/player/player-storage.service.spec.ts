import { TestBed } from '@angular/core/testing';

import { PlayerStorageService } from './player-storage.service';
import { Player } from './player';

function createPlayer() {
  return new Player({
    id: '00:04:20:07:93:9b',
    name: 'player',
    seqNo: 1,
    canPoweroff: true,
    firmware: '7.8.0-r16754',
    isPlayer: true,
    displayType: 'graphic-320x32',
    isPlaying: true,
    connected: true,
    modelName: 'Squeezebox Touch',
    uuid: '584c879280617e4e0c1b4ff78af5a525',
    index: 1,
    power: false,
    model: 'Squeezebox Classic',
    ip: '1.2.3.4:48666',
  });
}

describe('PlayerStorageService', () => {
  let service: PlayerStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(PlayerStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('empty player', () => {
    expect(service.getPlayer()).toBeNull();
  });

  it('stored player', () => {
    const player = createPlayer();
    service.storePlayer(player);
    const storedPlayer = service.getPlayer();
    expect(storedPlayer).not.toBeNull();
    expect(storedPlayer.id).toEqual(player.id);
    expect(storedPlayer.ip).toEqual(player.ip);
    expect(storedPlayer.name).toEqual(player.name);
    expect(storedPlayer.seqNo).toEqual(player.seqNo);
    expect(storedPlayer.canPoweroff).toEqual(player.canPoweroff);
    expect(storedPlayer.firmware).toEqual(player.firmware);
    expect(storedPlayer.isPlaying).toEqual(player.isPlaying);
    expect(storedPlayer.isPlayer).toEqual(player.isPlayer);
    expect(storedPlayer.displayType).toEqual(player.displayType);
    expect(storedPlayer.connected).toEqual(player.connected);
    expect(storedPlayer.modelName).toEqual(player.modelName);
    expect(storedPlayer.uuid).toEqual(player.uuid);
    expect(storedPlayer.index).toEqual(player.index);
    expect(storedPlayer.power).toEqual(player.power);
    expect(storedPlayer.model).toEqual(player.model);
  });
});
