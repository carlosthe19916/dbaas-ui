import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { Constants } from 'src/constants';
import { serializeRequestParamsForApi } from 'src/hooks/table-controls';
import { ParamHelper } from 'src/utilities';
import { ApiPaginatedResult, ApiRequestParams } from './models';

export interface ApiSearchResult<T> {
  total: number;
  result: T[];
}

export const apiPaginatedResponseToApiPaginatedResult = <T>(
  data: ApiSearchResult<T>,
  params: ApiRequestParams,
): ApiPaginatedResult<T> => {
  return {
    data: data.result,
    total: data.total,
    params,
  };
};

export class BaseAPI {
  apiPath: string = '';
  http: AxiosInstance;

  constructor(apiBaseUrl: string) {
    this.http = axios.create({
      baseURL: apiBaseUrl,
    });

    this.http.interceptors.request.use((request: any) =>
      this.authHandler(request),
    );
  }

  get(id: string, apiPath?: string) {
    return this.http.get(this.getPath(apiPath) + id + '/');
  }

  getPaginatedResult = <T>(
    apiPath: string,
    params: ApiRequestParams = {},
  ): Promise<ApiPaginatedResult<T>> => {
    return this.http
      .get<ApiSearchResult<T>>(this.getPath(apiPath), {
        params: serializeRequestParamsForApi(params),
      })
      .then(({ data }) =>
        apiPaginatedResponseToApiPaginatedResult(data, params),
      );
  };

  getPath(apiPath?: string) {
    return apiPath || this.apiPath;
  }

  private async authHandler(request: any) {
    // This runs before every API request and ensures that the user is
    // authenticated before the request is executed. On most calls it appears
    // to only add ~10ms of latency.
    if (DEPLOYMENT_MODE === Constants.INSIGHTS_DEPLOYMENT_MODE) {
      await window.insights.chrome.auth.getUser();
    }
    if (DEPLOYMENT_MODE === Constants.STANDALONE_DEPLOYMENT_MODE) {
      request.headers['X-CSRFToken'] = Cookies.get('csrftoken');
    }
    return request;
  }
}
