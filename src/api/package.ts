import { HubAPI } from './hub';
import { ApiRequestParams, Package, PackageDetails } from './models';

class API extends HubAPI {
  apiPath = this.getUIPath('package');

  get(id: string) {
    return this.http.get<PackageDetails>(`${this.apiPath}?id=${id}`);
  }

  search(params: ApiRequestParams = {}) {
    return this.getPaginatedResult<Package>(`${this.apiPath}/search`, params);
  }
}

export const PackageAPI = new API();
