import { TestBed } from '@angular/core/testing';

import { ArtistsService } from './artists.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArtistRequestService } from './artist-request.service';
import { of } from 'rxjs';
import { Artist } from './artist';
import { Navigation } from '../navigations/navigation';

const testNav = function(
  a: Array<Navigation>,
  position: number,
  index: string,
  count: number,
  start: number
) {
  expect(a[position].index).toBe(index);
  expect(a[position].count).toBe(count);
  expect(a[position].url).toBe(`/artists/${index}`);
  expect(a[position].start).toBe(start);
};

const testArtist = function(
  artist: Artist,
  id: string,
  name: string,
  index: string
) {
  expect(artist.id).toBe(id);
  expect(artist.name).toBe(name);
  expect(artist.index).toBe(index);
};

describe('ArtistsService', () => {
  let service: ArtistsService;
  let artistRequestSpy: jasmine.SpyObj<ArtistRequestService>;

  beforeEach(() => {
    artistRequestSpy = jasmine.createSpyObj('artistRequestSpy', [
      'navigations',
      'search',
      'artistById',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ArtistRequestService, useValue: artistRequestSpy },
      ],
    });
    service = TestBed.get(ArtistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('types', done => {
    artistRequestSpy.artistById.and.returnValue(
      of(require('./test-data/artistById.json'))
    );
    service.artistById('123').subscribe(a => {
      expect(typeof a.id).toBe('string');
      expect(typeof a.index).toBe('string');
      expect(typeof a.name).toBe('string');
      done();
    });
  });

  it('artist by id', done => {
    artistRequestSpy.artistById.and.returnValue(
      of(require('./test-data/artistById.json'))
    );
    service.artistById('123').subscribe(a => {
      expect(a.id).toBe('4690');
      expect(a.index).toBe('E');
      expect(a.name).toBe('Eric Clapton');
      done();
    });
  });

  it('navigations', done => {
    artistRequestSpy.navigations.and.returnValue(
      of(require('./test-data/artistNavigations.json'))
    );
    service.navigations().subscribe(a => {
      testNav(a, 0, '-', 1, 0);
      testNav(a, 1, '1', 4, 1);
      testNav(a, 2, '2', 41, 5);
      testNav(a, 3, '3', 5, 46);
      testNav(a, 4, '4', 1, 51);
      testNav(a, 5, '5', 1, 52);
      testNav(a, 6, 'A', 292, 53);
      testNav(a, 7, 'B', 410, 345);
      testNav(a, 8, 'C', 293, 755);
      testNav(a, 9, 'D', 315, 1048);
      testNav(a, 10, 'E', 116, 1363);
      testNav(a, 11, 'F', 98, 1479);
      testNav(a, 12, 'G', 165, 1577);
      testNav(a, 13, 'H', 117, 1742);
      testNav(a, 14, 'I', 38, 1859);
      testNav(a, 15, 'J', 475, 1897);
      testNav(a, 16, 'K', 120, 2372);
      testNav(a, 17, 'L', 136, 2492);
      testNav(a, 18, 'M', 286, 2628);
      testNav(a, 19, 'N', 94, 2914);
      testNav(a, 20, 'O', 39, 3008);
      testNav(a, 21, 'P', 145, 3047);
      testNav(a, 22, 'Q', 9, 3192);
      testNav(a, 23, 'R', 220, 3201);
      testNav(a, 24, 'S', 289, 3421);
      testNav(a, 25, 'T', 161, 3710);
      testNav(a, 26, 'U', 10, 3871);
      testNav(a, 27, 'V', 45, 3881);
      testNav(a, 28, 'W', 100, 3926);
      testNav(a, 29, 'Y', 9, 4026);
      testNav(a, 30, 'Z', 5, 4035);
      done();
    });
  });

  it('search', done => {
    artistRequestSpy.search.and.returnValue(
      of(require('./test-data/artistSearch.json'))
    );

    service.search('clap').subscribe(r => {
      expect(r.count).toBe(5);
      expect(r.pageCount).toBe(1);

      const artists = r.artists;
      expect(artists.length).toBe(5);
      testArtist(artists[0], '4690', 'Eric Clapton', 'E');
      testArtist(artists[1], '5320', 'Eric Clapton & JJ Cale', 'E');
      testArtist(artists[2], '5794', 'JJ Cale & Eric Clapton', 'J');
      testArtist(artists[3], '5321', 'Eric Clapton and BB King', 'E');
      testArtist(artists[4], '5322', 'Eric Clapton and Friends', 'E');
      done();
    });
  });

  it('search empty results', done => {
    artistRequestSpy.search.and.returnValue(
      of(require('./test-data/artistSearchEmptyResponse.json'))
    );

    service.search('clap').subscribe(artistResponse => {
      expect(artistResponse.count).toBe(0);
      expect(artistResponse.pageCount).toBe(0);
      done();
    });
  });

  it('search page 2', done => {
    artistRequestSpy.search.and.returnValue(
      of(require('./test-data/artistSearchPage2.json'))
    );

    service.search('clap', 2).subscribe(artistResponse => {
      expect(artistResponse.count).toBe(282);
      expect(artistResponse.pageCount).toBe(2);
      done();
    });
  });
});
