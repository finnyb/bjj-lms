import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../bread-crumbs/breadcrumb';
import { ArtistsService } from './artists.service';
import { Navigation } from '../navigations/navigation';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AlbumService } from '../album/album.service';
import { ArtistSelectedService } from './artist-selected.service';
import { Album } from '../album/album';
import { TrackService } from '../tracks/track.service';
import { Track } from '../tracks/track';
import { Filter } from '../filter/filter';
import { FilterType } from '../filter/filter-type.enum';
import { ArtistListService } from './artist-list.service';
import { ArtistResponse } from './artist-response';

@Component({
  selector: 'app-artists',
  templateUrl: './artists-layout.component.html',
  styleUrls: ['./artists-layout.component.scss'],
})
export class ArtistsLayoutComponent implements OnInit {
  crumbs: Breadcrumb[] = [
    {
      label: 'Artists',
      url: 'artists',
    },
  ];

  navigations: Array<Navigation>;
  artistTracks: Array<Track>;
  albums: Array<Album>;

  private currentFilter: Filter;
  private currentPage = 0;
  private numberOfPages = 0;

  constructor(
    private artistsService: ArtistsService,
    private artistListService: ArtistListService,
    private artistSelectedService: ArtistSelectedService,
    private albumService: AlbumService,
    private trackService: TrackService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadNavigations();
  }

  loadNavigations(): void {
    this.artistsService.navigations().subscribe(navs => {
      this.navigations = navs;
      this.listenToRoute();
    });
  }

  filter(filter: Filter): void {
    if (filter.value.length > 2) {
      this.reset();
      this.currentFilter = filter;
      switch (filter.type) {
        case FilterType.NAME:
          this.artistsService
            .search(filter.value)
            .subscribe(r => this.loadArtistsResponse(r));
          break;
        case FilterType.YEAR:
          this.artistsService
            .artistByYear(filter.value)
            .subscribe(r => this.loadArtistsResponse(r));
          break;
        default:
          this.artistsService
            .search(filter.value)
            .subscribe(r => this.loadArtistsResponse(r));
          break;
      }
    } else {
      this.currentFilter = null;
    }
  }

  private loadArtistsResponse(r: ArtistResponse) {
    this.currentPage = r.startingPage;
    this.numberOfPages = r.pageCount;
    this.artistListService.add(r.artists);
  }

  private listenToRoute(): void {
    this.route.paramMap.subscribe((map: ParamMap) => {
      this.reset();
      if (map.has('index')) {
        this.artistsService
          .artistsForNavigation(this.navForIndex(map.get('index')))
          .subscribe(r => this.loadArtistsResponse(r));
      }

      if (map.has('id')) {
        forkJoin([
          this.albumService.albumsByArtistId(map.get('id')),
          this.trackService.tracksByArtistId(map.get('id')),
        ]).subscribe(results => {
          this.albums = results[0];
          this.artistTracks = results[1];
        });
      }
    });
  }

  private reset() {
    this.currentPage = 0;
    this.artistListService.reset();
  }

  private navForIndex(index: string): Navigation {
    return this.navigations.filter(n => n.index === index)[0];
  }

  nextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      if (this.currentFilter != null) {
        switch (this.currentFilter.type) {
          case FilterType.NAME:
            this.artistsService
              .search(this.currentFilter.value, this.currentPage)
              .subscribe(r => this.loadArtistsResponse(r));
            break;
          case FilterType.YEAR:
            this.artistsService
              .artistByYear(this.currentFilter.value, this.currentPage)
              .subscribe(r => this.loadArtistsResponse(r));
            break;
          default:
            this.artistsService
              .search(this.currentFilter.value, this.currentPage)
              .subscribe(r => this.loadArtistsResponse(r));
            break;
        }
      } else {
        this.artistsService
          .artistsForPage(this.currentPage)
          .subscribe(r => this.loadArtistsResponse(r));
      }
    }
  }
}
