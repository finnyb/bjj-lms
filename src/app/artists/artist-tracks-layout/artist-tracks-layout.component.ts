import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from '../../bread-crumbs/breadcrumb';
import { TrackService } from '../../tracks/track.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArtistsService } from '../artists.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Track } from '../../tracks/track';

@Component({
  selector: 'app-artist-tracks-layout',
  templateUrl: './artist-tracks-layout.component.html',
  styleUrls: ['./artist-tracks-layout.component.scss'],
})
export class ArtistTracksLayoutComponent implements OnInit {
  tracks$: Observable<Array<Track>>;

  crumbs: Breadcrumb[] = [
    {
      label: 'Artists',
      url: 'artists',
    },
  ];

  constructor(
    private service: TrackService,
    private artistService: ArtistsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listenToRoute();
  }

  private listenToRoute(): void {
    this.tracks$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.tracksByArtistId(params.get('id'))
      )
    );

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.artistService.artistById(params.get('id'))
        )
      )
      .subscribe(artist => {
        this.crumbs.push({
          label: artist.name,
          url: '',
        });
      });
  }
}
