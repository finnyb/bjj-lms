interface ArtistConfig {
  id: string;
  name: string;
  index: string;
}

export class Artist {
  id: string;
  name: string;
  index: string;

  constructor(config: ArtistConfig) {
    this.id = config.id;
    this.name = config.name;
    this.index = config.index;
  }
}
