import { SecondsToTimePipe } from './seconds-to-time.pipe';

describe('SecondsToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new SecondsToTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('zero', () => {
    const pipe = new SecondsToTimePipe();
    expect(pipe.transform(0)).toBe('00:00');
  });

  it('null', () => {
    const pipe = new SecondsToTimePipe();
    expect(pipe.transform(null)).toBe('00:00');
  });

  it('less than a minute', () => {
    const pipe = new SecondsToTimePipe();
    expect(pipe.transform(59)).toBe('00:59');
  });

  it('more than a minute', () => {
    const pipe = new SecondsToTimePipe();
    expect(pipe.transform(61)).toBe('01:01');
  });

  it('more than ten minutes', () => {
    const pipe = new SecondsToTimePipe();
    expect(pipe.transform(601)).toBe('10:01');
  });

  it('more than 59 minutes', () => {
    const pipe = new SecondsToTimePipe();
    expect(pipe.transform(6001)).toBe('01:40:01');
  });

  it('more than 9 hours', () => {
    const pipe = new SecondsToTimePipe();
    expect(pipe.transform(80001)).toBe('22:13:21');
  });

  // 4,609 Hours = 16592400 Seconds
  //              1659338
  // 16 Minutes = 960 Seconds
  // 23 seconds
  it('large duration', () => {
    const pipe = new SecondsToTimePipe();
    expect(pipe.transform(16593383)).toBe('4609:16:23');
  });
});
