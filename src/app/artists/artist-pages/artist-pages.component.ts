import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArtistResponse } from '../artist-response';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-artist-pages',
  templateUrl: './artist-pages.component.html',
  styleUrls: ['./artist-pages.component.scss'],
})
export class ArtistPagesComponent implements OnInit {
  @Input() artistResponse: ArtistResponse;
  @Output() pageEvent = new EventEmitter<PageEvent>();

  constructor() {}

  ngOnInit() {}

  pageSelected(event: PageEvent) {
    this.pageEvent.emit(event);
  }
}
