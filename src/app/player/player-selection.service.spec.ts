import { TestBed } from '@angular/core/testing';

import { PlayerSelectionService } from './player-selection.service';
import { of } from 'rxjs';
import { PlayerService } from './player.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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

function createPlayers(): Player[] {
  return [createPlayer()];
}

describe('PlayerSelectionService', () => {
  let service: PlayerSelectionService;
  let playerServiceSpy: jasmine.SpyObj<PlayerService>;

  beforeEach(() => {
    playerServiceSpy = jasmine.createSpyObj('playerServiceSpy', [
      'status',
      'tracks',
      'getPlayers',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PlayerService, useValue: playerServiceSpy }],
    });

    playerServiceSpy.getPlayers.and.returnValue(of(createPlayers()));
    service = TestBed.get(PlayerSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('last player not found', () => {
    expect(service).toBeTruthy();
  });
});
