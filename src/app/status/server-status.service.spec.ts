import { TestBed } from '@angular/core/testing';

import { ServerStatusService } from './server-status.service';
import { ServerStatusRequestService } from './server-status-request.service';
import { of } from 'rxjs';

describe('ServerStatusService', () => {
  let serverStatusRequestServiceSpy: jasmine.SpyObj<ServerStatusRequestService>;
  let service: ServerStatusService;

  beforeEach(() => {
    serverStatusRequestServiceSpy = jasmine.createSpyObj(
      'serverStatusRequestServiceSpy',
      ['status']
    );
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ServerStatusRequestService,
          useValue: serverStatusRequestServiceSpy,
        },
      ],
    });
    service = TestBed.get(ServerStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('status', done => {
    serverStatusRequestServiceSpy.status.and.returnValue(
      of(require('./mock-data/testServerStatus.json'))
    );
    service.status().subscribe(s => {
      expect(s.lastScan).toBe(1560554965);
      expect(s.totalSongs).toBe(67768);
      expect(s.totalAlbums).toBe(4863);
      expect(s.totalArtists).toBe(4277);
      expect(s.totalGenres).toBe(85);
      expect(s.totalDuration).toBe(16593383);
      expect(s.playerCount).toBe(2);
      expect(s.version).toBe('7.9.1');
      expect(s.uuid).toBe('441f2eab-d85e-434d-9510-cb5f6d1c2f26');
      expect(s.mac).toBe('00:01:2e:3b:fb:00');
      done();
    });
  });
});
