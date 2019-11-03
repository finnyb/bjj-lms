import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  navigations;

  constructor(private route: ActivatedRoute) {
    this.navigations = [
      {
        id: 'playlist',
        name: 'Playlist',
      },
      {
        id: 'artists',
        name: 'Artists',
      },
      {
        id: 'apps',
        name: 'Apps',
      },
      {
        id: 'info',
        name: 'Info',
      },
    ];
  }

  ngOnInit() {}
}
