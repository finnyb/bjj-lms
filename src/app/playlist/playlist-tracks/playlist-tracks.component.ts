import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlaylistTrack } from '../playlist-track';
import { Player } from '../../player/player';
import { PlaylistListService } from '../playlist-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss'],
})
export class PlaylistTracksComponent implements OnInit {
  @Input() player: Player;
  @Input() currentTrack: PlaylistTrack;
  @Output() pageEvent = new EventEmitter();

  tracks: Array<PlaylistTrack> = [];

  private tracksSubscription: Subscription;
  private triggerPercentage = 0.8;

  constructor(private service: PlaylistListService) {}

  ngOnInit() {
    this.service.reset();
    this.tracksSubscription = this.service.playlistTrackSource$.subscribe(
      tracks => (this.tracks = tracks)
    );
  }

  currentlyPlaying(track: PlaylistTrack): boolean {
    return this.currentTrack == null
      ? false
      : this.currentTrack.playlistIndex === track.playlistIndex;
  }

  scrollHandler($event) {
    if ($event > this.tracks.length * this.triggerPercentage) {
      this.pageEvent.emit();
    }
  }
}
