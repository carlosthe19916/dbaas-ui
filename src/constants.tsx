export class Constants {
  static readonly DEFAULT_PAGE_SIZE = 10;

  static readonly INSIGHTS_DEPLOYMENT_MODE = 'insights';
  static readonly STANDALONE_DEPLOYMENT_MODE = 'standalone';
}

// URL param prefixes: should be short, must be unique for each table that uses one
export enum TableURLParamKeyPrefix {
  products = 'p',
}

export const useMockData = (): boolean => {
  return UI_USE_MOCK_DATA === true || UI_USE_MOCK_DATA === 'true';
};
