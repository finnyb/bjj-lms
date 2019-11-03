import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlaylistRequestService } from './playlist-request.service';
import { of } from 'rxjs';
import { Track } from '../tracks/track';
import { Album } from '../album/album';
import { Artist } from '../artists/artist';
import { Player } from '../player/player';
import { PlaylistTrack } from './playlist-track';

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

describe('PlaylistService', () => {
  let service: PlaylistService;
  let playlistRequestSpy: jasmine.SpyObj<PlaylistRequestService>;

  beforeEach(() => {
    playlistRequestSpy = jasmine.createSpyObj('playlistRequestSpy', [
      'playTrack',
      'addTrack',
      'addAlbum',
      'addArtist',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: PlaylistRequestService, useValue: playlistRequestSpy },
      ],
    });
    service = TestBed.get(PlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('play playlist track', done => {
    playlistRequestSpy.playTrack.and.returnValue(
      of(require('./test-data/playPlaylistTrack.json'))
    );
    service
      .playTrack(
        createPlayer(),
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
      .subscribe(p => {
        expect(p).toBe(true);
        done();
      });
  });

  it('add track', done => {
    playlistRequestSpy.addTrack.and.returnValue(
      of(require('./test-data/addTrack.json'))
    );
    service
      .addTrack(
        createPlayer(),
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
      .subscribe(p => {
        expect(p).toBe(1);
        done();
      });
  });

  it('add album', done => {
    playlistRequestSpy.addAlbum.and.returnValue(
      of(require('./test-data/addAlbum.json'))
    );
    service
      .addAlbum(
        createPlayer(),
        new Album({
          id: '85965',
          name: '',
          artworkTrackId: '',
          artistId: '123',
          artist: 'name',
          year: '0',
        })
      )
      .subscribe(p => {
        expect(p).toBe(12);
        done();
      });
  });

  it('add artist', done => {
    playlistRequestSpy.addArtist.and.returnValue(
      of(require('./test-data/addArtist.json'))
    );
    service
      .addArtist(
        createPlayer(),
        new Artist({
          id: '85966',
          name: '',
          index: '',
        })
      )
      .subscribe(p => {
        expect(p).toBe(21);
        done();
      });
  });
});
