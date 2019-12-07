import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist } from '../artist';
import { ArtistListService } from '../artist-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
})
export class ArtistListComponent implements OnInit {
  @Input() selectedArtist: Artist;
  @Output() pageEvent = new EventEmitter();

  artists$: Observable<Artist[]>;
  private triggerPercentage = 0.8;

  artists: Array<Artist> = [];

  constructor(private artistListService: ArtistListService) {}

  ngOnInit() {
    this.artists$ = this.artistListService.artistSource$;
  }

  scrollHandler($event) {
    if ($event > this.artists.length * this.triggerPercentage) {
      this.pageEvent.emit();
    }
  }
}
