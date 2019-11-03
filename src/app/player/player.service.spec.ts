import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';
import { of } from 'rxjs';
import { Player } from './player';
import {
  Command,
  MixerCommand,
  PlayerRequestService,
} from './player-request.service';
import { Mode } from './status/player-status';

const testPlayer = function(
  player: Player,
  id: string,
  name: string,
  seqNo: number,
  canPoweroff: boolean,
  firmware: string,
  isPlayer: boolean,
  displayType: string,
  isPlaying: boolean,
  connected: boolean,
  modelName: string,
  ip: string,
  uuid: string,
  index: number,
  power: boolean,
  model: string
) {
  expect(player.id).toEqual(id);
  expect(player.name).toEqual(name);
  expect(player.seqNo).toEqual(seqNo);
  expect(player.canPoweroff).toEqual(canPoweroff);
  expect(player.firmware).toEqual(firmware);
  expect(player.isPlayer).toEqual(isPlayer);
  expect(player.displayType).toEqual(displayType);
  expect(player.isPlaying).toEqual(isPlaying);
  expect(player.connected).toEqual(connected);
  expect(player.modelName).toEqual(modelName);
  expect(player.ip).toEqual(ip);
  expect(player.uuid).toEqual(uuid);
  expect(player.index).toEqual(index);
  expect(player.power).toEqual(power);
  expect(player.model).toEqual(model);
};

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

describe('PlayerService', () => {
  let service: PlayerService;
  let playerRequestServiceSpy: jasmine.SpyObj<PlayerRequestService>;

  beforeEach(() => {
    playerRequestServiceSpy = jasmine.createSpyObj('playerRequestSpy', [
      'request',
      'action',
      'status',
      'mixer',
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: PlayerRequestService, useValue: playerRequestServiceSpy },
      ],
    });
    service = TestBed.get(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('player name', done => {
    playerRequestServiceSpy.request.and.returnValue(
      of(require('./test-data/testPlayers.json'))
    );
    service.getPlayers().subscribe(players => {
      expect(players.length).toBe(2);
      testPlayer(
        players[0],
        '00:04:20:22:0a:90',
        'Office',
        4,
        true,
        '7.8.0-r16754',
        true,
        'none',
        false,
        true,
        'Squeezebox Touch',
        '172.30.74.109:47746',
        '584c879280617e4e0c1b4ff78af5a525',
        0,
        false,
        'fab4'
      );

      testPlayer(
        players[1],
        '00:04:20:07:93:9b',
        'Theater',
        0,
        true,
        '137',
        true,
        'graphic-320x32',
        false,
        true,
        'Squeezebox Classic',
        '172.30.74.176:42578',
        '',
        1,
        false,
        'squeezebox3'
      );
      done();
    });
  });

  it('status playing', done => {
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/playerStatusPlaying.json'))
    );
    service.status(createPlayer()).subscribe(p => {
      expect(p.name).toBe('SoftSqueeze');
      expect(p.volume).toBe(92);
      expect(p.muted).toBe(false);
      expect(p.sequence).toBe(11);
      expect(p.power).toBe(true);
      expect(p.signalStrength).toBe(100);
      expect(p.playlistTimestamp).toBe(1543062582.9608);
      expect(p.digitalVolumeControl).toBe(true);
      expect(p.ip).toBe('172.30.74.109:58329');
      expect(p.tracks).toBe(9);
      expect(p.connected).toBe(true);
      expect(p.shuffle).toBe(false);
      expect(p.repeat).toBe(false);
      expect(p.duration).toBe(282);
      expect(p.playlistDuration).toBe(2289);
      expect(p.mode).toBe(Mode.PLAYING);
      expect(p.playlistMode).toBe('off');
      expect(p.currentIndex).toBe(6);
      expect(p.time).toBe(136);
      expect(p.rescanning).toBe(false);
      done();
    });
  });

  it('status defaults', done => {
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/playerStatusDefaults.json'))
    );
    service.status(createPlayer()).subscribe(p => {
      expect(p.name).toBe('');
      expect(p.volume).toBe(0);
      expect(p.muted).toBe(false);
      expect(p.sequence).toBe(0);
      expect(p.power).toBe(false);
      expect(p.signalStrength).toBe(0);
      expect(p.playlistTimestamp).toBe(0);
      expect(p.digitalVolumeControl).toBe(false);
      expect(p.ip).toBe('0.0.0.0');
      expect(p.tracks).toBe(0);
      expect(p.connected).toBe(false);
      expect(p.shuffle).toBe(false);
      expect(p.repeat).toBe(false);
      expect(p.duration).toBe(0);
      expect(p.playlistDuration).toBe(0);
      expect(p.mode).toBe(Mode.STOPPED);
      expect(p.playlistMode).toBe('off');
      expect(p.currentIndex).toBe(0);
      expect(p.time).toBe(0);
      expect(p.rescanning).toBe(false);
      done();
    });
  });

  it('status playing with rescan', done => {
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/playerStatusPlayingWithRescan.json'))
    );
    service.status(createPlayer()).subscribe(p => {
      expect(p.rescanning).toBe(true);
      done();
    });
  });

  it('status stopped', done => {
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/playerStatusStopped.json'))
    );
    service.status(createPlayer()).subscribe(p => {
      expect(p.mode).toBe(Mode.STOPPED);
      done();
    });
  });

  it('status paused', done => {
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/playerStatusPaused.json'))
    );
    service.status(createPlayer()).subscribe(p => {
      expect(p.mode).toBe(Mode.PAUSED);
      done();
    });
  });

  it('status muted', done => {
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/playerStatusMuted.json'))
    );
    service.status(createPlayer()).subscribe(p => {
      expect(p.muted).toBe(true);
      done();
    });
  });

  it('status not muted', done => {
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/playerStatusNotMuted.json'))
    );
    service.status(createPlayer()).subscribe(p => {
      expect(p.muted).toBe(false);
      done();
    });
  });

  it('types', done => {
    playerRequestServiceSpy.request.and.returnValue(
      of(require('./test-data/testPlayers.json'))
    );
    service.getPlayers().subscribe(p => {
      expect(typeof p[0].id).toBe('string');
      expect(typeof p[0].name).toBe('string');
      expect(typeof p[0].canPoweroff).toBe('boolean');
      expect(typeof p[0].connected).toBe('boolean');
      expect(typeof p[0].displayType).toBe('string');
      expect(typeof p[0].firmware).toBe('string');
      expect(typeof p[0].index).toBe('number');
      expect(typeof p[0].isPlayer).toBe('boolean');
      expect(typeof p[0].isPlaying).toBe('boolean');
      expect(typeof p[0].ip).toBe('string');
      expect(typeof p[0].model).toBe('string');
      expect(typeof p[0].modelName).toBe('string');
      expect(typeof p[0].uuid).toBe('string');
      expect(typeof p[0].seqNo).toBe('number');
      expect(typeof p[0].power).toBe('boolean');
      done();
    });
  });

  it('player tracks page 1', done => {
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/testPlayerTracksPage0.json'))
    );
    service.tracks(createPlayer()).subscribe(r => {
      expect(r.count).toBe(133);
      expect(r.tracks.length).toBe(100);
      expect(r.tracks[0].id).toBe('127346');
      expect(r.tracks[0].name).toBe('Vicarious');
      expect(r.tracks[0].playlistIndex).toBe(0);
      expect(r.tracks[0].artist).toBe('Tool');
      expect(r.tracks[0].artistId).toBe('7892');
      expect(r.tracks[0].genre).toBe('No Genre');
      expect(r.tracks[0].genreId).toBe('78');
      expect(r.tracks[0].year).toBe('2006');
      expect(r.tracks[0].album).toBe('10,000 Days');
      expect(r.tracks[0].albumId).toBe('9188');
      expect(r.tracks[0].coverId).toBe('de5bfd10');
      expect(r.tracks[0].num).toBe('1');
      expect(r.tracks[0].bitrate).toBe('959kbps VBR');
      expect(r.tracks[0].type).toBe('flac');

      expect(r.tracks[99].id).toBe('74782');
      expect(r.tracks[99].name).toBe('You');
      expect(r.tracks[99].playlistIndex).toBe(99);
      expect(r.tracks[99].artist).toBe('Breaking Benjamin');
      expect(r.tracks[99].artistId).toBe('4480');
      expect(r.tracks[99].genre).toBe('No Genre');
      expect(r.tracks[99].genreId).toBe('78');
      expect(r.tracks[99].year).toBe('2006');
      expect(r.tracks[99].album).toBe('Phobia');
      expect(r.tracks[99].albumId).toBe('5383');
      expect(r.tracks[99].coverId).toBe('3eb74a8f');
      expect(r.tracks[99].num).toBe('4');
      expect(r.tracks[99].bitrate).toBe('1001kbps VBR');
      expect(r.tracks[99].type).toBe('flac');

      done();
    });
  });

  it('player tracks with errors', done => {
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/testPlayerTracksErrors.json'))
    );
    service.tracks(createPlayer()).subscribe(r => {
      expect(r.count).toBe(18);

      // expect(r.tracks.length).toBe(100);
      // expect(r.tracks[0].id).toBe('127346');
      // expect(r.tracks[0].name).toBe('Vicarious');
      // expect(r.tracks[0].playlistIndex).toBe(0);
      // expect(r.tracks[0].artist).toBe('Tool');
      // expect(r.tracks[0].artistId).toBe('7892');
      // expect(r.tracks[0].genre).toBe('No Genre');
      // expect(r.tracks[0].genreId).toBe('78');
      // expect(r.tracks[0].year).toBe('2006');
      // expect(r.tracks[0].album).toBe('10,000 Days');
      // expect(r.tracks[0].albumId).toBe('9188');
      // expect(r.tracks[0].coverId).toBe('de5bfd10');
      // expect(r.tracks[0].num).toBe('1');
      // expect(r.tracks[0].bitrate).toBe('959kbps VBR');
      // expect(r.tracks[0].type).toBe('flac');
      //
      // expect(r.tracks[99].id).toBe('74782');
      // expect(r.tracks[99].name).toBe('You');
      // expect(r.tracks[99].playlistIndex).toBe(99);
      // expect(r.tracks[99].artist).toBe('Breaking Benjamin');
      // expect(r.tracks[99].artistId).toBe('4480');
      // expect(r.tracks[99].genre).toBe('No Genre');
      // expect(r.tracks[99].genreId).toBe('78');
      // expect(r.tracks[99].year).toBe('2006');
      // expect(r.tracks[99].album).toBe('Phobia');
      // expect(r.tracks[99].albumId).toBe('5383');
      // expect(r.tracks[99].coverId).toBe('3eb74a8f');
      // expect(r.tracks[99].num).toBe('4');
      // expect(r.tracks[99].bitrate).toBe('1001kbps VBR');
      // expect(r.tracks[99].type).toBe('flac');

      done();
    });
  });

  it('player tracks page 1', done => {
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/testPlayerTracksPage1.json'))
    );
    service.tracks(createPlayer()).subscribe(r => {
      expect(r.count).toBe(133);
      expect(r.pageCount).toBe(1);
      expect(r.tracks.length).toBe(33);
      // expect(r.tracks[0].id).toBe('127346');
      // expect(r.tracks[0].name).toBe('Vicarious');
      // expect(r.tracks[0].playlistIndex).toBe(0);
      // expect(r.tracks[0].artist).toBe('Tool');
      // expect(r.tracks[0].artistId).toBe('7892');
      // expect(r.tracks[0].genre).toBe('No Genre');
      // expect(r.tracks[0].genreId).toBe('78');
      // expect(r.tracks[0].year).toBe('2006');
      // expect(r.tracks[0].album).toBe('10,000 Days');
      // expect(r.tracks[0].albumId).toBe('9188');
      // expect(r.tracks[0].coverId).toBe('de5bfd10');
      // expect(r.tracks[0].num).toBe('1');
      // expect(r.tracks[0].bitrate).toBe('959kbps VBR');
      // expect(r.tracks[0].type).toBe('flac');
      //
      // expect(r.tracks[99].id).toBe('74782');
      // expect(r.tracks[99].name).toBe('You');
      // expect(r.tracks[99].playlistIndex).toBe(99);
      // expect(r.tracks[99].artist).toBe('Breaking Benjamin');
      // expect(r.tracks[99].artistId).toBe('4480');
      // expect(r.tracks[99].genre).toBe('No Genre');
      // expect(r.tracks[99].genreId).toBe('78');
      // expect(r.tracks[99].year).toBe('2006');
      // expect(r.tracks[99].album).toBe('Phobia');
      // expect(r.tracks[99].albumId).toBe('5383');
      // expect(r.tracks[99].coverId).toBe('3eb74a8f');
      // expect(r.tracks[99].num).toBe('4');
      // expect(r.tracks[99].bitrate).toBe('1001kbps VBR');
      // expect(r.tracks[99].type).toBe('flac');

      done();
    });
  });

  it('play', done => {
    playerRequestServiceSpy.action.and.returnValue(
      of(require('./test-data/play.json'))
    );
    const playerId = '00:04:20:07:93:9b';
    service.play(createPlayer()).subscribe(r => {
      expect(playerRequestServiceSpy.action).toHaveBeenCalledWith(
        playerId,
        Command.Play
      );
      expect(r).toBe(true);
      done();
    });
  });

  it('stop', done => {
    playerRequestServiceSpy.action.and.returnValue(
      of(require('./test-data/stop.json'))
    );
    const playerId = '00:04:20:07:93:9b';
    service.stop(createPlayer()).subscribe(r => {
      expect(playerRequestServiceSpy.action).toHaveBeenCalledWith(
        playerId,
        Command.Stop
      );
      expect(r).toBe(true);
      done();
    });
  });

  it('pause', done => {
    playerRequestServiceSpy.action.and.returnValue(
      of(require('./test-data/pause.json'))
    );
    const playerId = '00:04:20:07:93:9b';
    service.pause(createPlayer()).subscribe(r => {
      expect(playerRequestServiceSpy.action).toHaveBeenCalledWith(
        playerId,
        Command.Pause
      );
      expect(r).toBe(true);
      done();
    });
  });

  it('power', done => {
    playerRequestServiceSpy.action.and.returnValue(
      of(require('./test-data/power.json'))
    );
    const playerId = '00:04:20:07:93:9b';
    service.power(createPlayer()).subscribe(r => {
      expect(playerRequestServiceSpy.action).toHaveBeenCalledWith(
        playerId,
        Command.Power
      );
      expect(r).toBe(true);
      done();
    });
  });

  it('volume', done => {
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/playerStatusVolume.json'))
    );
    playerRequestServiceSpy.mixer.and.returnValue(
      of(require('./test-data/volume.json'))
    );

    const playerId = '00:04:20:07:93:9b';
    service.volume(createPlayer(), 10).subscribe(s => {
      expect(playerRequestServiceSpy.mixer).toHaveBeenCalledWith(
        playerId,
        MixerCommand.Volume,
        '10'
      );
      expect(s).toBe(10);
      done();
    });
  });

  it('mute', done => {
    playerRequestServiceSpy.mixer.and.returnValue(
      of(require('./test-data/muting.json'))
    );
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/playerStatusMuted.json'))
    );

    const playerId = '00:04:20:07:93:9b';
    service.mute(createPlayer()).subscribe(s => {
      expect(playerRequestServiceSpy.mixer).toHaveBeenCalledWith(
        playerId,
        MixerCommand.Muting,
        'toggle'
      );
      expect(s).toBe(true);
      done();
    });
  });

  it('mute', done => {
    playerRequestServiceSpy.mixer.and.returnValue(
      of(require('./test-data/muting.json'))
    );
    playerRequestServiceSpy.status.and.returnValue(
      of(require('./test-data/playerStatusNotMuted.json'))
    );

    const playerId = '00:04:20:07:93:9b';
    service.mute(createPlayer()).subscribe(s => {
      expect(playerRequestServiceSpy.mixer).toHaveBeenCalledWith(
        playerId,
        MixerCommand.Muting,
        'toggle'
      );
      expect(s).toBe(false);
      done();
    });
  });
});
