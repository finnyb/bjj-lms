export class RescanStep {
  public id: string;
  public name: string;
  public percentage: number;

  constructor(props: Required<RescanStep>) {
    Object.assign(this, props);
  }
}

export class RescanProgress {
  scanning: boolean;
  totalTime: string;
  currentDescription: string;
  info: string;
  steps: Array<RescanStep>;

  constructor(props: Required<RescanProgress>) {
    Object.assign(this, props);
  }
}
