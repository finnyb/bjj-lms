import { TestBed } from '@angular/core/testing';

import { PlayerStatusService } from './player-status.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Mode } from './player-status';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import { of } from 'rxjs';

function createPlayer(): Player {
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

function createStatus() {
  return {
    name: '',
    volume: 0,
    muted: false,
    sequence: 0,
    power: false,
    signalStrength: 0,
    playlistTimestamp: 0,
    digitalVolumeControl: false,
    ip: '0.0.0.0',
    tracks: 0,
    connected: false,
    shuffle: false,
    repeat: false,
    duration: 0,
    playlistDuration: 0,
    mode: Mode.STOPPED,
    playlistMode: 'off',
    time: 0,
    rescanning: false,
  };
}

describe('PlayerStatusService', () => {
  let service: PlayerStatusService;
  let playerServiceSpy: jasmine.SpyObj<PlayerService>;

  beforeEach(() => {
    playerServiceSpy = jasmine.createSpyObj('playerServiceSpy', [
      'status',
      'tracks',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PlayerService, useValue: playerServiceSpy }],
    });
    service = TestBed.get(PlayerStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('empty player', () => {
    expect(service.checkStatus());
    expect(playerServiceSpy.status).not.toHaveBeenCalled();
  });

  it('empty playlist', () => {
    playerServiceSpy.tracks.and.returnValue(of({}));
    playerServiceSpy.status.and.returnValue(of({}));
    service.selected(createPlayer());
    expect(service.checkStatus());
    expect(playerServiceSpy.status).toHaveBeenCalled();
  });
});
