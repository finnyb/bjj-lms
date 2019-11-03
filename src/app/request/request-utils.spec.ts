import utils from './request-utils';

describe('RequestUtils tagged params', () => {
  it('join array', () => {
    expect(
      utils.parseTaggedParameters(['artist_id:5383', 'sort:albumtrack'])
    ).toBe('artist_id:5383", "sort:albumtrack');
  });

  it('array length of 1', () => {
    expect(utils.parseTaggedParameters(['o'])).toBe('o');
  });

  it('array length of 0', () => {
    expect(utils.parseTaggedParameters([])).toBe('');
  });

  it('return tags join array', () => {
    expect(
      utils.parseReturnTags([
        'playlist_tracks',
        't',
        'a',
        'e',
        'l',
        'y',
        'r',
        'o',
      ])
    ).toBe('playlist_tracks,t,a,e,l,y,r,o');
  });

  it('return tags array length of 1', () => {
    expect(utils.parseReturnTags(['o'])).toBe('o');
  });

  it('return tags array length of 0', () => {
    expect(utils.parseReturnTags([])).toBe('');
  });
});
