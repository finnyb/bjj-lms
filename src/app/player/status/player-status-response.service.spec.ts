import { TestBed } from '@angular/core/testing';

import { PlayerStatusResponseService } from './player-status-response.service';
import { PlayerStatusResponse } from './player-status-response';

function createResponse(value: any): PlayerStatusResponse {
  const r = new PlayerStatusResponse();
  r.result = {
    power: value,
    player_name: value,
    rate: value,
    digital_volume_control: value,
    time: value,
    playlist_timestamp: value,
    can_seek: value,
    'playlist shuffle': value,
    'playlist repeat': value,
    playlist_tracks: value,
    'mixer volume': value,
    mode: value,
    playlist_cur_index: value,
    player_ip: value,
    'playlist duration': value,
    seq_no: value,
    signalstrength: value,
    duration: value,
    'playlist mode': value,
    player_connected: value,
    rescan: value,
  };

  return r;
}

describe('PlayerStatusResponseService', () => {
  let service: PlayerStatusResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(PlayerStatusResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('default name null', () => {
    expect(service.mapPlayerStatus(createResponse(null)).name).toBe('');
  });

  it('default name undefined', () => {
    expect(service.mapPlayerStatus(createResponse(undefined)).name).toBe('');
  });

  it('default mixer volume null', () => {
    expect(service.mapPlayerStatus(createResponse(null)).volume).toBe(0);
  });

  it('default mixer volume undefined', () => {
    expect(service.mapPlayerStatus(createResponse(undefined)).volume).toBe(0);
  });

  it('default sequence null', () => {
    expect(service.mapPlayerStatus(createResponse(null)).sequence).toBe(0);
  });

  it('default sequence undefined', () => {
    expect(service.mapPlayerStatus(createResponse(undefined)).sequence).toBe(0);
  });

  it('default power null', () => {
    expect(service.mapPlayerStatus(createResponse(null)).power).toBe(false);
  });

  it('default power undefined', () => {
    expect(service.mapPlayerStatus(createResponse(undefined)).power).toBe(
      false
    );
  });

  it('default digital volume control null', () => {
    expect(
      service.mapPlayerStatus(createResponse(null)).digitalVolumeControl
    ).toBe(false);
  });

  it('default digital volume control undefined', () => {
    expect(
      service.mapPlayerStatus(createResponse(undefined)).digitalVolumeControl
    ).toBe(false);
  });

  it('not muted volume 0', () => {
    expect(service.mapPlayerStatus(createResponse(0)).muted).toBe(false);
  });

  it('not muted volume greater than 0', () => {
    expect(service.mapPlayerStatus(createResponse(10)).muted).toBe(false);
  });

  it('muted', () => {
    expect(service.mapPlayerStatus(createResponse(-20)).muted).toBe(true);
  });

  it('default rescanning null', () => {
    expect(service.mapPlayerStatus(createResponse(null)).rescanning).toBe(
      false
    );
  });

  it('default rescanning undefined', () => {
    expect(service.mapPlayerStatus(createResponse(undefined)).rescanning).toBe(
      false
    );
  });

  it('default shuffle control null', () => {
    expect(service.mapPlayerStatus(createResponse(null)).shuffle).toBe(false);
  });

  it('default shuffle control undefined', () => {
    expect(service.mapPlayerStatus(createResponse(undefined)).shuffle).toBe(
      false
    );
  });

  it('default repeat null', () => {
    expect(service.mapPlayerStatus(createResponse(null)).repeat).toBe(false);
  });

  it('default repeat undefined', () => {
    expect(service.mapPlayerStatus(createResponse(undefined)).repeat).toBe(
      false
    );
  });

  it('time rounded less than .5', () => {
    const r = createResponse(null);
    r.result.time = 82.420407989502;
    expect(service.mapPlayerStatus(r).time).toBe(82);
  });

  it('time rounded greater then equal .5', () => {
    const r = createResponse(null);
    r.result.time = 82.520407989502;
    expect(service.mapPlayerStatus(r).time).toBe(83);
  });

  it('duration rounded less than .5', () => {
    const r = createResponse(null);
    r.result.duration = 194.087;
    expect(service.mapPlayerStatus(r).duration).toBe(194);
  });

  it('duration rounded greater then equal .5', () => {
    const r = createResponse(null);
    r.result.duration = 194.587;
    expect(service.mapPlayerStatus(r).duration).toBe(195);
  });

  it('playlist duration rounded less than .5', () => {
    const r = createResponse(null);
    r.result['playlist duration'] = 390.164;
    expect(service.mapPlayerStatus(r).playlistDuration).toBe(390);
  });

  it('playlist duration rounded greater then equal .5', () => {
    const r = createResponse(null);
    r.result['playlist duration'] = 390.564;
    expect(service.mapPlayerStatus(r).playlistDuration).toBe(391);
  });
});

// TODO pick up here
// expect(p.signalStrength).toBe(0);
// expect(p.playlistTimestamp).toBe(0);
// expect(p.ip).toBe('0.0.0.0');
// expect(p.tracks).toBe(0);
// expect(p.connected).toBe(false);
// expect(p.duration).toBe(0);
// expect(p.playlistDuration).toBe(0);
// expect(p.mode).toBe(Mode.STOPPED);
// expect(p.playlistMode).toBe('off');
// expect(p.currentIndex).toBe(0);
// expect(p.time).toBe(0);
