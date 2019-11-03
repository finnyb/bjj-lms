import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist } from '../artist';
import { ArtistListService } from '../artist-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
})
export class ArtistListComponent implements OnInit {
  @Input() selectedArtist: Artist;
  @Output() pageEvent = new EventEmitter();

  private artistSubscription: Subscription;
  private triggerPercentage = 0.8;

  artists: Array<Artist> = [];

  constructor(private artistListService: ArtistListService) {}

  ngOnInit() {
    this.artistSubscription = this.artistListService.artistSource$.subscribe(
      artists => (this.artists = artists)
    );
  }

  scrollHandler($event) {
    if ($event > this.artists.length * this.triggerPercentage) {
      this.pageEvent.emit();
    }
  }
}
