import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoverService {
  private urlFullImage = '/music/{id}/cover.jpg';
  private urlThumbnail50 = '/music/{id}/cover_50x50_o';
  private urlThumbnail100 = '/music/{id}/cover_100x100_o';
  private urlThumbnail250 = '/music/{id}/cover_250x250_o';
  private currentCover = '/music/current/cover.jpg?player={playerId}';

  constructor() {}

  coverUrl(id: string): string {
    return this.urlFullImage.replace('{id}', id);
  }

  thumbnailUrl50px(id: string): string {
    return this.urlThumbnail50.replace('{id}', id);
  }

  thumbnailUrl100px(id: string): string {
    return this.urlThumbnail100.replace('{id}', id);
  }

  thumbnailUrl250px(id: string): string {
    return this.urlThumbnail250.replace('{id}', id);
  }

  currentlyPlayingCover(playerId: string): string {
    return this.currentCover.replace('{playerId}', playerId);
  }
}
