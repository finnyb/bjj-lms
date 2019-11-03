import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlbumRequestService } from './album-request.service';
import { Album } from './album';
import { of } from 'rxjs';
import { Artist } from '../artists/artist';

const testAlbum = function(
  album: Album,
  id: string,
  artworkTrackId: string,
  artist: string,
  artistId: string,
  year: string
) {
  expect(album.id).toBe(id);
  expect(album.artworkTrackId).toBe(artworkTrackId);
  expect(album.artist).toBe(artist);
  expect(album.artistId).toBe(artistId);
  expect(album.year).toBe(year);
};

describe('AlbumService', () => {
  let service: AlbumService;
  let albumRequestSpy: jasmine.SpyObj<AlbumRequestService>;

  beforeEach(() => {
    albumRequestSpy = jasmine.createSpyObj('albumRequestSpy', [
      'albumsByArtist',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AlbumRequestService, useValue: albumRequestSpy }],
    });
    service = TestBed.get(AlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('types', done => {
    albumRequestSpy.albumsByArtist.and.returnValue(
      of(require('./test-data/artistAlbums.json'))
    );
    service
      .albumsByArtist(
        new Artist({
          id: '123',
          name: 'Clapton',
          index: 'E',
        })
      )
      .subscribe(a => {
        expect(typeof a[0].id).toBe('string');
        expect(typeof a[0].artworkTrackId).toBe('string');
        expect(typeof a[0].artist).toBe('string');
        expect(typeof a[0].artistId).toBe('string');
        expect(typeof a[0].name).toBe('string');
        expect(typeof a[0].year).toBe('string');
        done();
      });
  });

  it('albums for artist', done => {
    albumRequestSpy.albumsByArtist.and.returnValue(
      of(require('./test-data/artistAlbums.json'))
    );
    service
      .albumsByArtist(
        new Artist({
          id: '123',
          name: 'Clapton',
          index: 'E',
        })
      )
      .subscribe(a => {
        expect(a.length).toBe(22);
        testAlbum(a[0], '6153', '1ac1eb55', 'Eric Clapton', '4690', '1974');
        testAlbum(a[1], '6154', 'c0653b87', 'Eric Clapton', '4690', '1986');
        testAlbum(a[2], '6155', '4453bde9', 'Eric Clapton', '4690', '2005');
        testAlbum(a[3], '6156', 'eb3ac431', 'Eric Clapton', '4690', '1985');
        testAlbum(a[4], '6157', 'b9f9d6e6', 'Eric Clapton', '4690', '2007');
        testAlbum(a[5], '6169', 'ff38d410', 'Eric Clapton', '4690', '1981');
        testAlbum(a[6], '6158', '1c26ed99', 'Eric Clapton', '4690', '0');
        testAlbum(a[7], '6159', 'cbd75780', 'Eric Clapton', '4690', '1975');
        testAlbum(a[8], '6160', '31275efc', 'Eric Clapton', '4690', '1994');
        testAlbum(a[9], '6161', '1fa239d7', 'Eric Clapton', '4690', '1989');
        testAlbum(a[10], '6162', 'c393d731', 'Eric Clapton', '4690', '1996');
        testAlbum(a[11], '6163', 'e7c3422d', 'Eric Clapton', '4690', '2004');
        testAlbum(a[12], '6164', '1bb9ca38', 'Eric Clapton', '4690', '1998');
        testAlbum(a[13], '6165', 'ba60823b', 'Eric Clapton', '4690', '2000');
        testAlbum(a[14], '6166', 'c5fb0239', 'Eric Clapton', '4690', '2000');
        testAlbum(a[15], '6167', '76b90917', 'Eric Clapton', '4690', '2004');
        testAlbum(a[16], '6168', '7ab37c39', 'Eric Clapton', '4690', '1977');
        testAlbum(a[17], '6170', '684fc2a4', 'Eric Clapton', '4690', '1982');
        testAlbum(a[18], '6171', '7a6972b2', 'Eric Clapton', '4690', '1992');
        testAlbum(a[19], '5748', 'b8495124', 'Various Artists', '4690', '2002');
        testAlbum(a[20], '5749', 'e9967a65', 'Various Artists', '4690', '2003');
        testAlbum(a[21], '5750', 'b0bc367b', 'Various Artists', '4690', '2004');
        done();
      });
  });
});
