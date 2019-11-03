import { Component, OnInit } from '@angular/core';
import { ServerStatusService } from '../../status/server-status.service';

export interface Stat {
  name: string;
  value: string;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  stats: Stat[];
  duration: number;

  displayedColumns: string[] = ['name', 'value'];

  constructor(private service: ServerStatusService) {}

  ngOnInit() {
    this.service.status().subscribe(s => {
      this.duration = s.totalDuration;
      this.stats = [
        { name: 'Tracks', value: s.totalSongs.toString() },
        { name: 'Artists', value: s.totalArtists.toString() },
        { name: 'Albums', value: s.totalAlbums.toString() },
        { name: 'Genres', value: s.totalGenres.toString() },
      ];
    });
  }
}
