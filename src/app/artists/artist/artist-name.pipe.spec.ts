import { ArtistNamePipe } from './artist-name.pipe';

describe('ArtistNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ArtistNamePipe();
    expect(pipe).toBeTruthy();
  });
});
