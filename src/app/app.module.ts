import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlayerComponent } from './information/player/player.component';
import { HeaderPlayerComponent } from './header/header-player/header-player.component';
import { PlayerListComponent } from './header/player-list/player-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatsComponent } from './information/stats/stats.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { ArtistsLayoutComponent } from './artists/artists-layout.component';
import { MaterialModule } from './MaterialModule';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterComponent } from './filter/filter.component';
import { NavigationsComponent } from './navigations/navigations.component';
import { NavigationComponent } from './navigations/navigation/navigation.component';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { ArtistAlbumListComponent } from './artists/artist-album-list/artist-album-list.component';
import { ArtistComponent } from './artists/artist/artist.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './router-strategy';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ArtistAlbumTracksComponent } from './artists/artist-album-list/artist-album-tracks/artist-album-tracks.component';
import { ArtistTracksLayoutComponent } from './artists/artist-tracks-layout/artist-tracks-layout.component';
import { TracksComponent } from './tracks/tracks/tracks.component';
import { AddTrackComponent } from './playlist/actions/add-track/add-track.component';
import { PlaylistLayoutComponent } from './playlist/playlist-layout/playlist-layout.component';
import { PlaylistTracksComponent } from './playlist/playlist-tracks/playlist-tracks.component';
import { PlaylistTrackComponent } from './playlist/playlist-track/playlist-track.component';
import { PlaylistCurrentComponent } from './playlist/playlist-current/playlist-current.component';
import { CurrentlyPlayingComponent } from './header/currently-playing/currently-playing.component';
import { AddAlbumComponent } from './playlist/actions/add-album/add-album.component';
import { AddArtistComponent } from './playlist/actions/add-artist/add-artist.component';
import { ClearComponent } from './playlist/actions/clear/clear.component';
import { PlaylistActionsComponent } from './playlist/playlist-layout/playlist-actions/playlist-actions.component';
import { ArtistPagesComponent } from './artists/artist-pages/artist-pages.component';
import { SecondsToTimePipe } from './tracks/seconds-to-time.pipe';
import { ArtistNamePipe } from './artists/artist/artist-name.pipe';
import { SettingsLayoutComponent } from './information/settings-layout/settings-layout.component';
import { RescanComponent } from './information/database/rescan/rescan.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { RescanStepComponent } from './information/database/rescan/rescan-step/rescan-step.component';
import { PlaylistTrackActionsComponent } from './playlist/playlist-track/playlist-track-actions/playlist-track-actions.component';
import { VolumeComponent } from './header/volume/volume.component';
import { MatSliderModule } from '@angular/material/slider';
import { PlayerDetailComponent } from './information/player/player-detail/player-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayerComponent,
    HeaderPlayerComponent,
    PlayerListComponent,
    SidebarComponent,
    StatsComponent,
    BreadCrumbsComponent,
    ArtistsLayoutComponent,
    FilterComponent,
    NavigationsComponent,
    NavigationComponent,
    ArtistListComponent,
    ArtistAlbumListComponent,
    ArtistComponent,
    ArtistAlbumTracksComponent,
    ArtistTracksLayoutComponent,
    TracksComponent,
    AddTrackComponent,
    PlaylistLayoutComponent,
    PlaylistTracksComponent,
    PlaylistTrackComponent,
    PlaylistCurrentComponent,
    CurrentlyPlayingComponent,
    AddAlbumComponent,
    AddArtistComponent,
    ClearComponent,
    PlaylistActionsComponent,
    ArtistPagesComponent,
    SecondsToTimePipe,
    ArtistNamePipe,
    SettingsLayoutComponent,
    RescanComponent,
    RescanStepComponent,
    PlaylistTrackActionsComponent,
    VolumeComponent,
    PlayerDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatSliderModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
