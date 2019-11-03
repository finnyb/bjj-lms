import { App } from './app';
import { AppResponse } from './app-response';

interface AppProperties {
  name: string;
  type: string;
  cmd: string;
  weight: number;
  icon: string;
}

interface Result {
  count: number;
  appss_loop: AppProperties[];
}

function mapApp(a: AppProperties): App {
  return new App({
    name: a.name,
    type: a.type,
    command: a.cmd,
    weight: a.weight,
    icon: a.icon,
  });
}

export function mapApps(response: AppApiResponse): AppResponse {
  if (response.result.count > 0) {
    return new AppResponse(
      response.result.count,
      response.result.appss_loop.map(a => mapApp(a))
    );
  } else {
    return new AppResponse(0, []);
  }
}

export class AppApiResponse {
  result: Result;
}
