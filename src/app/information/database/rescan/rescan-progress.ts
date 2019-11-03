interface RescanProgressConfig {
  scanning: boolean;
  totalTime: string;
  fullname: string;
  info: string;
  steps: Array<RescanStep>;
}

export class RescanStep {
  constructor(
    public id: string,
    public name: string,
    public percentage: number
  ) {}
}

export class RescanProgress {
  scanning: boolean;
  totalTime: string;
  currentDescription: string;
  info: string;
  steps: Array<RescanStep>;

  constructor(config: RescanProgressConfig) {
    this.scanning = config.scanning;
    this.totalTime = config.totalTime;
    this.currentDescription = config.fullname;
    this.steps = config.steps;
    this.info = config.info;
  }
}
