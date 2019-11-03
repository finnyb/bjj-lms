import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime',
})
export class SecondsToTimePipe implements PipeTransform {
  transform(seconds: number): string {
    if (seconds == null) {
      return '00:00';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) % 60;
    const secs = seconds % 60;

    return [hours, minutes, secs]
      .map(v => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  }
}
