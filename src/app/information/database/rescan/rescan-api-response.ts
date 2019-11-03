import { RescanProgress, RescanStep } from './rescan-progress';

function mapName(id: string) {
  switch (id) {
    case 'discovering_directory':
      return 'Discovering directories';
    case 'directory_new':
      return 'Scanning new directories';
    case 'discovering_playlist':
      return 'Discovering playlists';
    case 'plugin_fulltext':
      return 'Scanning plugins';
    case 'updateStandaloneArtwork':
      return 'Updating artwork';
    case 'dboptimize':
      return 'Optimizing database';
    default:
      return id.charAt(0).toUpperCase() + id.slice(1).replace('_', ' ');
  }
}

interface RescanProperties {
  rescan: boolean;
  totaltime: string;
  fullname: string;
  steps: string;
  info: string;
}

function processSteps(scanSteps: string, rawResponse: any) {
  const steps = new Array<RescanStep>();

  scanSteps.split(',').forEach(s => {
    steps.push(
      new RescanStep(
        s,
        mapName(s),
        rawResponse[s] == null || rawResponse[s] < 0 ? 0 : rawResponse[s]
      )
    );
    console.log(s);
  });

  return steps;
}

function mapProgress(rawResult: any): RescanProgress {
  const r: RescanProperties = rawResult;

  return new RescanProgress({
    scanning: !!r.rescan,
    totalTime: r.totaltime == null ? '' : r.totaltime,
    fullname: r.fullname,
    info: r.info == null ? '' : r.info,
    steps: r.steps == null ? [] : processSteps(r.steps, rawResult),
  });
}

export class RescanApiResponse {
  result: RescanProperties;
}

export function mapRescan(response: RescanApiResponse): boolean {
  return !!response.result;
}

export function mapRescanProgress(rawResponse: any): RescanProgress {
  return mapProgress(rawResponse.result);
}
