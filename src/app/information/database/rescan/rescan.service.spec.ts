import { TestBed } from '@angular/core/testing';

import { RescanService } from './rescan.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RescanRequestService } from './rescan-request.service';
import { of } from 'rxjs';

describe('RescanService', () => {
  let service: RescanService;
  let rescanRequestSpy: jasmine.SpyObj<RescanRequestService>;

  beforeEach(() => {
    rescanRequestSpy = jasmine.createSpyObj('rescanRequestSpy', [
      'rescan',
      'rescanProgress',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: RescanRequestService, useValue: rescanRequestSpy },
      ],
    });
    service = TestBed.get(RescanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('rescan', done => {
    rescanRequestSpy.rescan.and.returnValue(
      of(require('./test-data/rescan.json'))
    );

    service.rescan().subscribe(r => {
      expect(r).toBe(true);
      done();
    });
  });

  it('rescan progress done', done => {
    rescanRequestSpy.rescanProgress.and.returnValue(
      of(require('./test-data/rescanProgressDone.json'))
    );

    service.rescanProgress().subscribe(r => {
      expect(r.scanning).toBe(false);
      expect(r.totalTime).toBe('');
      expect(r.info).toBe('');
      expect(r.steps.length).toBe(0);
      done();
    });
  });

  it('rescan progress start', done => {
    rescanRequestSpy.rescanProgress.and.returnValue(
      of(require('./test-data/rescanProgressDiscoverPlaylist.json'))
    );

    service.rescanProgress().subscribe(r => {
      expect(r.scanning).toBe(true);
      expect(r.totalTime).toBe('00:03:16');
      expect(r.currentDescription).toBe(
        'Discovering playlists: /home/bill/Music'
      );
      expect(r.info).toBe('');
      expect(r.steps[0].id).toBe('discovering_directory');
      expect(r.steps[0].name).toBe('Discovering directories');
      expect(r.steps[0].percentage).toBe(100);
      expect(r.steps[1].id).toBe('directory_new');
      expect(r.steps[1].name).toBe('Scanning new directories');
      expect(r.steps[1].percentage).toBe(99);
      expect(r.steps[2].id).toBe('discovering_playlist');
      expect(r.steps[2].name).toBe('Discovering playlists');
      expect(r.steps[2].percentage).toBe(98);
      expect(r.steps[3].id).toBe('plugin_fulltext');
      expect(r.steps[3].name).toBe('Scanning plugins');
      expect(r.steps[3].percentage).toBe(97);
      expect(r.steps[4].id).toBe('updateStandaloneArtwork');
      expect(r.steps[4].name).toBe('Updating artwork');
      expect(r.steps[4].percentage).toBe(96);
      expect(r.steps[5].id).toBe('dboptimize');
      expect(r.steps[5].name).toBe('Optimizing database');
      expect(r.steps[5].percentage).toBe(1);
      done();
    });
  });

  it('rescan progress start', done => {
    rescanRequestSpy.rescanProgress.and.returnValue(
      of(require('./test-data/rescanProgressDiscoverDirectory.json'))
    );

    service.rescanProgress().subscribe(r => {
      expect(r.scanning).toBe(true);
      expect(r.totalTime).toBe('00:00:12');
      expect(r.currentDescription).toBe(
        'Discovering files/directories: /mnt/music'
      );
      expect(r.info).toBe('/mnt/music/D/The Doors/Waiting For The Sun');
      expect(r.steps[0].id).toBe('discovering_directory');
      expect(r.steps[0].name).toBe('Discovering directories');
      expect(r.steps[0].percentage).toBe(0);
      done();
    });
  });

  it('rescan progress missing step', done => {
    rescanRequestSpy.rescanProgress.and.returnValue(
      of(require('./test-data/rescanProgressMissingStep.json'))
    );

    service.rescanProgress().subscribe(r => {
      expect(r.steps[5].id).toBe('dboptimize');
      expect(r.steps[5].percentage).toBe(0);
      done();
    });
  });

  it('rescan progress unknown step', done => {
    rescanRequestSpy.rescanProgress.and.returnValue(
      of(require('./test-data/rescanProgressUnknownStep.json'))
    );

    service.rescanProgress().subscribe(r => {
      expect(r.steps[0].id).toBe('unknown_step');
      expect(r.steps[0].name).toBe('Unknown step');
      expect(r.steps[0].percentage).toBe(0);
      done();
    });
  });
});
