import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'artistName',
})
export class ArtistNamePipe implements PipeTransform {
  transform(value: string): any {
    return value.substr(0, 50);
  }
}
