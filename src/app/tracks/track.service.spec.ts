import { TestBed } from '@angular/core/testing';

import { TrackService } from './track.service';
import { Track } from './track';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TrackRequestService } from './track-request.service';
import { of } from 'rxjs';

const testTrack = function(
  track: Track,
  id: string,
  name: string,
  artist: string,
  num: string,
  albumId: string,
  album: string,
  year: string,
  bitrate: string,
  type: string,
  artworkTrackId: string
) {
  expect(track.num).toBe(num);
  expect(track.name).toBe(name);
  expect(track.id).toBe(id);
  expect(track.artist).toBe(artist);
  expect(track.album).toBe(album);
  expect(track.albumId).toBe(albumId);
  expect(track.year).toBe(year);
  expect(track.type).toBe(type);
  expect(track.bitrate).toBe(bitrate);
  expect(track.artworkTrackId).toBe(artworkTrackId);
};

describe('TrackService', () => {
  let service: TrackService;
  let trackRequestSpy: jasmine.SpyObj<TrackRequestService>;

  beforeEach(() => {
    trackRequestSpy = jasmine.createSpyObj('trackRequestSpy', [
      'tracksForArtist',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: TrackRequestService, useValue: trackRequestSpy }],
    });
    service = TestBed.get(TrackService);
  });

  it('types', done => {
    trackRequestSpy.tracksForArtist.and.returnValue(
      of(require('./test-data/tracksForArtist.json'))
    );
    service.tracksByArtistId('7892').subscribe(t => {
      expect(typeof t[0].id).toBe('string');
      expect(typeof t[0].artworkTrackId).toBe('string');
      expect(typeof t[0].artist).toBe('string');
      expect(typeof t[0].name).toBe('string');
      expect(typeof t[0].year).toBe('string');
      expect(typeof t[0].num).toBe('string');
      expect(typeof t[0].bitrate).toBe('string');
      expect(typeof t[0].album).toBe('string');
      expect(typeof t[0].albumId).toBe('string');
      expect(typeof t[0].type).toBe('string');
      done();
    });
  });

  it('tracks for artist', done => {
    trackRequestSpy.tracksForArtist.and.returnValue(
      of(require('./test-data/tracksForArtist.json'))
    );
    service.tracksByArtistId('7892').subscribe(t => {
      expect(t.length).toBe(63);
      testTrack(
        t[0],
        '127346',
        'Vicarious',
        'Tool',
        '1',
        '9188',
        '10,000 Days',
        '2006',
        '959kbps VBR',
        'flac',
        'de5bfd10'
      );
      done();
    });
  });

  it('tracks for artist', done => {
    trackRequestSpy.tracksForArtist.and.returnValue(
      of(require('./test-data/tracksForArtist.json'))
    );
    service.tracksByArtistId('7892').subscribe(t => {
      expect(t.length).toBe(63);
      testTrack(
        t[0],
        '127346',
        'Vicarious',
        'Tool',
        '1',
        '9188',
        '10,000 Days',
        '2006',
        '959kbps VBR',
        'flac',
        'de5bfd10'
      );
      done();
    });
  });

  it('empty track for artist', done => {
    trackRequestSpy.tracksForArtist.and.returnValue(
      of(require('./test-data/tracksArtistDefaults.json'))
    );
    service.tracksByArtistId('7892').subscribe(t => {
      // testTrack(t[0],
      //   '',
      //   '',
      //   '',
      //   '0',
      //   '',
      //   '',
      //   '0',
      //   '',
      //   '',
      //   '');
      done();
    });
  });
});
