import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { PlaylistRequestService } from './playlist-request.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Track } from '../tracks/track';
import { Album } from '../album/album';
import { Artist } from '../artists/artist';
import { PlaylistTrack } from './playlist-track';

describe('PlaylistRequestService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlaylistRequestService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: PlaylistRequestService = TestBed.get(PlaylistRequestService);
    expect(service).toBeTruthy();
  });

  it('add track', inject(
    [PlaylistRequestService],
    (service: PlaylistRequestService) => {
      service
        .addTrack(
          '00:04:20:22:0a:90',
          new Track({
            id: '85966',
            name: '',
            year: '0',
            artworkTrackId: '',
            bitrate: '',
            type: '',
            album: '',
            albumId: '',
            artist: '',
            num: '',
          })
        )
        .subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["playlistcontrol", "cmd:add", "track_id:85966"]]}'
      );
    }
  ));

  it('delete', inject(
    [PlaylistRequestService],
    (service: PlaylistRequestService) => {
      service
        .deleteTrack(
          '00:04:20:22:0a:90',
          new PlaylistTrack({
            playlistIndex: 0,
            id: '85966',
            name: '',
            year: '0',
            coverId: '',
            bitrate: '',
            type: '',
            album: '',
            albumId: '',
            artist: '',
            artistId: '',
            genre: '',
            genreId: '',
            num: '',
          })
        )
        .subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["playlistcontrol", "cmd:delete", "track_id:85966"]]}'
      );
    }
  ));

  it('add album', inject(
    [PlaylistRequestService],
    (service: PlaylistRequestService) => {
      service
        .addAlbum(
          '00:04:20:22:0a:90',
          new Album({
            id: '85965',
            name: '',
            artworkTrackId: '',
            artistId: '123',
            artist: 'name',
            year: '0',
          })
        )
        .subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["playlistcontrol", "cmd:add", "album_id:85965"]]}'
      );
    }
  ));

  it('add artist', inject(
    [PlaylistRequestService],
    (service: PlaylistRequestService) => {
      service
        .addArtist(
          '00:04:20:22:0a:90',
          new Artist({
            id: '85966',
            name: '',
            index: '',
          })
        )
        .subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["playlistcontrol", "cmd:add", "artist_id:85966"]]}'
      );
    }
  ));

  it('playlist index', inject(
    [PlaylistRequestService],
    (service: PlaylistRequestService) => {
      service
        .playTrack(
          '00:04:20:22:0a:90',
          new PlaylistTrack({
            playlistIndex: 5,
            id: '85966',
            name: '',
            year: '0',
            coverId: '',
            bitrate: '',
            type: '',
            album: '',
            albumId: '',
            artist: '',
            artistId: '',
            genre: '',
            genreId: '',
            num: '',
          })
        )
        .subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["playlist", "index", "5"]]}'
      );
    }
  ));

  it('clear', inject(
    [PlaylistRequestService],
    (service: PlaylistRequestService) => {
      service.clear('00:04:20:22:0a:90').subscribe(() => {});

      const req = httpMock.expectOne(`/jsonrpc.js`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(
        '{"method": "slim.request", "params": ["00:04:20:22:0a:90", ["playlist", "clear"]]}'
      );
    }
  ));
});
