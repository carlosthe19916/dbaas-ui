import { HubAPI } from './hub';
import { ApiRequestParams, Product } from './models';

class API extends HubAPI {
  apiPath = this.getUIPath('product');

  get(id: string) {
    return this.http.get<Product>(`${this.apiPath}?id=${id}`);
  }

  search(params: ApiRequestParams = {}) {
    return this.getPaginatedResult<Product>(`${this.apiPath}/search`, params);
  }
}

export const ProductAPI = new API();
