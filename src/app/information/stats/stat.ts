export interface Config {
  name: string;
  value: number;
}

export class Stat {
  name: string;
  value: number;

  constructor(private config: Config) {
    this.name = config.name;
    this.value = config.value;
  }
}
