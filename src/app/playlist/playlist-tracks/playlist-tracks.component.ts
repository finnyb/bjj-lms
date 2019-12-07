import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PlaylistTrack } from '../playlist-track';
import { Player } from '../../player/player';
import { Subscription } from 'rxjs';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss'],
})
export class PlaylistTracksComponent implements OnInit, OnDestroy {
  @Input() player: Player;
  @Input() currentTrack: PlaylistTrack;
  @Output() pageEvent = new EventEmitter();

  tracks: Array<PlaylistTrack> = [];

  private tracksSubscription: Subscription;
  private triggerPercentage = 0.8;

  constructor(private service: PlaylistService) {}

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

  ngOnDestroy(): void {
    this.tracksSubscription.unsubscribe();
  }
}
