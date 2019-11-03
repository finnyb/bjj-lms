import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '../artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  @Input() artist: Artist;
  @Input() selected: boolean;

  constructor() {}

  ngOnInit() {}

  load() {
    console.log('loading artist albums -> ' + this.artist.name);
  }

  add() {
    console.log('adding to playlist artist -> ' + this.artist.id);
  }
}
