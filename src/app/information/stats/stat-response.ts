import { Stat } from './stat';

interface StatProperty {
  [key: string]: number;
}

interface Result {
  prop: StatProperty;
}

export function mapStat(name: string, s: StatResponse): Stat {
  return new Stat({
    name: name,
    value: s.result[Object.keys(s.result)[0]],
  });
}

export class StatResponse {
  result: Result;
}
