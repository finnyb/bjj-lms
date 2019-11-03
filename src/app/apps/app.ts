interface AppConfig {
  name: string;
  type: string;
  command: string;
  weight: number;
  icon: string;
}

export class App {
  name: string;
  type: string;
  command: string;
  weight: number;
  icon: string;

  constructor(config: AppConfig) {
    this.name = config.name;
    this.type = config.type;
    this.command = config.command;
    this.weight = config.weight;
    this.icon = config.icon;
  }
}
