import { HubAPI } from './hub';
import { Advisory, AdvisoryDetails, ApiRequestParams } from './models';

class API extends HubAPI {
  apiPath = this.getUIPath('advisory');

  get(id: string) {
    return this.http.get<AdvisoryDetails>(`${this.apiPath}?id=${id}`);
  }

  search(params: ApiRequestParams = {}) {
    return this.getPaginatedResult<Advisory>(`${this.apiPath}/search`, params);
  }
}

export const AdvisoryAPI = new API();
