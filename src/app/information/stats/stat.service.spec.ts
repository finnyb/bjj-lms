import { TestBed } from '@angular/core/testing';

import { StatService } from './stat.service';
import { StatRequestService } from './stat-request.service';
import { of } from 'rxjs';

const MOCK_ARTISTS_STAT: Object = {
  result: {
    _artists: 4258,
  },
};

const MOCK_ALBUMS_STAT: Object = {
  result: {
    _albums: 4821,
  },
};

const MOCK_TRACKS_STAT: Object = {
  result: {
    _songs: 67119,
  },
};

const MOCK_GENRES_STAT: Object = {
  result: {
    _genres: 83,
  },
};

const MOCK_DURATION_STAT: Object = {
  result: {
    _duration: 16461225.6919997,
  },
};

describe('StatService', () => {
  let service: StatService;
  let statRequestSpy: jasmine.SpyObj<StatRequestService>;

  beforeEach(() => {
    statRequestSpy = jasmine.createSpyObj('statRequestSpy', ['request']);
    TestBed.configureTestingModule({
      providers: [{ provide: StatRequestService, useValue: statRequestSpy }],
    });
    service = TestBed.get(StatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('artists stat', done => {
    statRequestSpy.request.and.returnValue(of(MOCK_ARTISTS_STAT));
    service.artists().subscribe(s => {
      expect(s.name).toBe('Artists');
      expect(s.value).toBe(4258);
      done();
    });
  });

  it('albums stat', done => {
    statRequestSpy.request.and.returnValue(of(MOCK_ALBUMS_STAT));
    service.albums().subscribe(s => {
      expect(s.name).toBe('Albums');
      expect(s.value).toBe(4821);
      done();
    });
  });

  it('tracks stat', done => {
    statRequestSpy.request.and.returnValue(of(MOCK_TRACKS_STAT));
    service.tracks().subscribe(s => {
      expect(s.name).toBe('Tracks');
      expect(s.value).toBe(67119);
      done();
    });
  });

  it('genres stat', done => {
    statRequestSpy.request.and.returnValue(of(MOCK_GENRES_STAT));
    service.genres().subscribe(s => {
      expect(s.name).toBe('Genres');
      expect(s.value).toBe(83);
      done();
    });
  });

  it('duration', done => {
    statRequestSpy.request.and.returnValue(of(MOCK_DURATION_STAT));
    service.duration().subscribe(s => {
      expect(s.name).toBe('Playtime');
      expect(s.value).toBe(16461225.6919997);
      done();
    });
  });

  it('all', done => {
    statRequestSpy.request.and.returnValue(of(MOCK_ARTISTS_STAT));
    statRequestSpy.request.and.returnValue(of(MOCK_ALBUMS_STAT));
    statRequestSpy.request.and.returnValue(of(MOCK_TRACKS_STAT));
    statRequestSpy.request.and.returnValue(of(MOCK_GENRES_STAT));
    statRequestSpy.request.and.returnValue(of(MOCK_DURATION_STAT));
    service.all().subscribe(s => {
      expect(s.length).toBe(5);
      expect(s[4].name).toBe('Playtime');
      expect(s[4].value).toBe(16461225.6919997);
      done();
    });
  });
});
