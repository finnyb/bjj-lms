import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsLayoutComponent } from './artists/artists-layout.component';
import { ArtistTracksLayoutComponent } from './artists/artist-tracks-layout/artist-tracks-layout.component';
import { PlaylistLayoutComponent } from './playlist/playlist-layout/playlist-layout.component';
import { SettingsLayoutComponent } from './information/settings-layout/settings-layout.component';
import { RescanComponent } from './information/database/rescan/rescan.component';
import { PlayerComponent } from './information/player/player.component';
import { StatsComponent } from './information/stats/stats.component';

const routes: Routes = [
  {
    path: 'artists',
    component: ArtistsLayoutComponent,
    data: {
      reuse: true,
    },
  },
  {
    path: 'artists/:index',
    component: ArtistsLayoutComponent,
    data: {
      reuse: true,
    },
  },
  {
    path: 'artists/:id/albums',
    component: ArtistsLayoutComponent,
    data: {
      reuse: true,
    },
  },
  {
    path: 'artists/:id/tracks',
    component: ArtistTracksLayoutComponent,
  },
  {
    path: 'playlist',
    component: PlaylistLayoutComponent,
  },
  {
    path: 'info',
    component: SettingsLayoutComponent,
    children: [
      { path: '', redirectTo: 'players', pathMatch: 'full' },
      { path: 'database', component: RescanComponent },
      { path: 'library', component: StatsComponent },
      { path: 'players', component: PlayerComponent },
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // {enableTracing: true} // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
