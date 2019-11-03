import { App } from './app';

export class AppResponse {
  apps: Array<App>;
  count: number;

  constructor(count: number, apps: Array<App>) {
    this.apps = apps;
    this.count = count;
  }
}
