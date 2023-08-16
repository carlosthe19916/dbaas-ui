import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { Constants } from 'src/constants';
import { serializeRequestParamsForApi } from 'src/hooks/table-controls';
import { ParamHelper } from 'src/utilities';
import { ApiPaginatedResult, ApiRequestParams } from './models';

interface ApiSearchResult<T> {
  total: number;
  result: T[];
}

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
    console.log(serializeRequestParamsForApi(params));
    return this.http
      .get<ApiSearchResult<T>>(this.getPath(apiPath), {
        params: serializeRequestParamsForApi(params),
      })
      .then(({ data }) => ({
        data: data.result,
        total: data.total,
        params,
      }));
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
      request.headers[
        'Authorization'
      ] = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJDSTNtZDZOeEVseHlTODR2LWNJV3l3VGRuTFo0SHlRVVNzV0dOeUVPUTc0In0.eyJleHAiOjE2OTE1OTMzNzAsImlhdCI6MTY5MTU5MzA3MCwiYXV0aF90aW1lIjoxNjkxNTkwMzg4LCJqdGkiOiIwMDQ4ZjI4Ni1iNGE3LTRmOGUtOGQ5ZS1kMGZmOGQxZTE3OTIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwOTAvcmVhbG1zL2NoaWNrZW4iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMGY0ZmFmM2ItMTFlYy00M2Q2LTkwYWUtNzc4YmU5MGIwNDNlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZnJvbnRlbmQiLCJub25jZSI6IjZlMTQ3ODYxLTA3YWYtNGNmMS1iYWQwLTdiOTkyMmFhNjE0MiIsInNlc3Npb25fc3RhdGUiOiJlZWJiYmJiNi1kNTA1LTRkODktYTI1MC0wNWE3MGY3ZDBiZWYiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJjaGlja2VuLXVzZXIiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImNoaWNrZW4tYWRtaW4iLCJkZWZhdWx0LXJvbGVzLWNoaWNrZW4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZWViYmJiYjYtZDUwNS00ZDg5LWEyNTAtMDVhNzBmN2QwYmVmIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiJ9.DtzzYmlC3JVBYKvjX5_ZraXJfiLEzKhC2xnge5uB13VvuqmqoXzTjaOpNqB46eXQXpptrJ51AZpqpiisLBle1ZMJSdjJId8BJqyXg4KkZu5yroc-UmD5aeFBgCtKocX8grRwelwPaqo4UwSI8GNsK_RqI0ZMeNFhFgko2IQqDb9XGLfko_UOg-0hIW2JO_tPKp-_U6LbMOae2BtDXGrxKp0cbofW9Ivmz52qvNzIdx2Ka7nAl40-8lifLojvGg9BYZMhF9S1wyq1Uv79GDeCREmilaou0Q9IKayFXuk2SQLw52-dPtopK6xgXQqXMSyf30v_2HUMwbRcvtEjPTpdWQ`;
    }
    return request;
  }
}
