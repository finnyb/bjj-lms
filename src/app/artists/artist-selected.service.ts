import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistSelectedService {
  private selectedSource = new Subject<string>();
  selected$ = this.selectedSource.asObservable();

  constructor() {}

  selected(id: string): void {
    this.selectedSource.next(id);
  }
}
