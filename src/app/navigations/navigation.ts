export interface Config {
  index: string;
  start: number;
  count: number;
  url: string;
}

export class Navigation {
  index: string;
  start: number;
  count: number;
  url: string;

  constructor(private config: Config) {
    this.index = config.index;
    this.start = config.start;
    this.count = config.count;
    this.url = config.url;
  }
}
