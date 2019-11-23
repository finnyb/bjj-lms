import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root',
})
export class PlayerStorageService {
  constructor() {}

  public storePlayer(player: Player): void {
    localStorage.setItem('selectedPlayer', JSON.stringify(player));
  }

  public getPlayer(): Player {
    return JSON.parse(localStorage.getItem('selectedPlayer'));
  }
}
