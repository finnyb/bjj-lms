import { getTestBed, inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  Command,
  MixerCommand,
  PlayerRequestService,
} from './player-request.service';

describe('PlayerRequest', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject(
    [PlayerRequestService],
    (service: PlayerRequestService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('defaults', inject(
    [PlayerRequestService],
    (service: PlayerRequestService) => {
      service.request().subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["-", ["players", "0", "100"]]}'
      );
      req.flush('');
    }
  ));

  it('play', inject([PlayerRequestService], (service: PlayerRequestService) => {
    service.action('00:04:20:22:0a:90', Command.Play).subscribe(() => {});

    const req = httpMock.expectOne(`/jsonrpc.js`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(
      '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["play"]]}'
    );
  }));

  it('stop', inject([PlayerRequestService], (service: PlayerRequestService) => {
    service.action('00:04:20:22:0a:90', Command.Stop).subscribe(() => {});

    const req = httpMock.expectOne(`/jsonrpc.js`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(
      '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["stop"]]}'
    );
  }));

  it('pause', inject(
    [PlayerRequestService],
    (service: PlayerRequestService) => {
      service.action('00:04:20:22:0a:90', Command.Pause).subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["pause"]]}'
      );
    }
  ));

  it('power', inject(
    [PlayerRequestService],
    (service: PlayerRequestService) => {
      service.action('00:04:20:22:0a:90', Command.Power).subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["power"]]}'
      );
    }
  ));

  it('tracks', inject(
    [PlayerRequestService],
    (service: PlayerRequestService) => {
      service
        .status('00:04:20:22:0a:90', [
          'playlist_tracks',
          't',
          'a',
          'e',
          'l',
          'y',
          'r',
          'o',
          'g',
        ])
        .subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["status", "0", "100", "tags: playlist_tracks,t,a,e,l,y,r,o,g"]]}'
      );
      req.flush('');
    }
  ));

  it('mixer', inject(
    [PlayerRequestService],
    (service: PlayerRequestService) => {
      service
        .mixer('00:04:20:22:0a:90', MixerCommand.Volume, '50')
        .subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["mixer", "volume", "50"]]}'
      );
    }
  ));
});
