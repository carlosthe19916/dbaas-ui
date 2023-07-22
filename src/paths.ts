import { Constants } from 'src/constants';
import { ParamHelper, ParamType } from 'src/utilities';

export function formatPath(path: string, data: any = {}, params?: ParamType) {
  // insights router has basename="/", "/beta/" or "/preview/", with hub under a nested "ansible/automation-hub" route - our urls are relative to that
  let url =
    DEPLOYMENT_MODE === Constants.INSIGHTS_DEPLOYMENT_MODE
      ? UI_BASE_PATH.replace('/preview/', '/')
          .replace('/beta/', '/')
          .replace(/\/$/, '')
      : '';
  url += (path as string) + '/';
  url = url.replaceAll('//', '/');

  for (const k of Object.keys(data)) {
    url = url.replace(':' + k, encodeURIComponent(data[k]));
  }

  if (params) {
    const path = `${url}?${ParamHelper.getQueryString(params)}`;
    return path;
  } else {
    return url;
  }
}

export enum Paths {
  ansibleRemoteDetail = '/ansible/remotes/:name',
}
