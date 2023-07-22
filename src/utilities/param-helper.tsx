import { cloneDeep } from 'lodash';

type ParamValueType = string | number | string[];
export type ParamType = Record<string, ParamValueType>;

export class ParamHelper {
  // Helper class for managing param object.
  // Param object is just a dictionary where the keys map to
  // parameter names that contain a value or list of values

  // Convert URLSearchParams object to param object
  static parseParamString(paramString: string, numericTypes?: string[]) {
    let params = {};
    const paramObj = new URLSearchParams(paramString);
    let v;

    paramObj.forEach((val, key) => {
      // do not append empty values at all (this will disable searching by empty strings)
      if (val.trim().length == 0) {
        return;
      }

      // Parse value as number if it's included in the list of numeric
      // types.
      // It seems like there should be a better way to do this based off
      // of the interface for the parameters, but I can't figure out if
      // that's possible or not
      if (numericTypes && numericTypes.includes(key)) {
        v = Number(val);
      } else {
        v = val;
      }

      params = ParamHelper.appendParam(params, key, v);
    });

    return params;
  }

  // Replaces specified parameter with speficied value
  static setParam(p: object, key: string, value: ParamValueType) {
    const params: any = cloneDeep(p);
    params[key] = value;

    return params;
  }

  // Appends parameter to existing value
  static appendParam(p: object, key: string, value: number | string) {
    const params: any = cloneDeep(p);
    if (params[key]) {
      if (Array.isArray(params[key])) {
        params[key].push(value);
      } else {
        params[key] = [params[key], value];
      }
    } else {
      params[key] = value;
    }

    return params;
  }

  // Returns a reduced set of parameters. Useful when not all params should
  // be passed to the API
  static getReduced(p: ParamType, keys: string[]) {
    const params = cloneDeep(p);
    for (const k of keys) {
      delete params[k];
    }

    return params;
  }

  // Removes a parameter, or a specific key value pair from a parameter object
  static deleteParam(p: any, key: string, value?: string | number) {
    const params = cloneDeep(p);
    if (value && Array.isArray(params[key]) && params[key].length > 1) {
      const i = params[key].indexOf(value);
      if (i !== -1) {
        params[key].splice(i, 1);
      }
    } else {
      delete params[key];
    }

    return params;
  }

  // Checks to see if a specific key value pair exists
  static paramExists(params: any, key: string, value: string | number) {
    const param = params[key];

    if (param) {
      if (Array.isArray(param)) {
        return param.includes(value);
      } else {
        return param === value;
      }
    } else {
      return false;
    }
  }

  // Returns the query string for the set of parameters
  static getQueryString(params: any, ignoreParams?: string[]) {
    const paramString = [];

    for (const key of Object.keys(params)) {
      // skip the param if its in the list of ignored params
      if (ignoreParams && ignoreParams.includes(key)) {
        continue;
      }
      if (Array.isArray(params[key])) {
        for (const val of params[key]) {
          paramString.push(key + '=' + encodeURIComponent(val));
        }
      } else {
        paramString.push(key + '=' + encodeURIComponent(params[key]));
      }
    }

    return paramString.join('&');
  }

  // Reusable function that can be included in a component to update it's
  // internal state and page params at the same time
  static updateParamsMixin(ignoreParams?: string[]) {
    return function (this: any, params: object, callback?: any) {
      // Note. In the callback, make sure to reference the state as
      // this.state instead of const { foo } = this.state.
      // In the example above, foo only gets set to the latest state after
      // the component re-runs render() and the callback typically gets
      // executed before that happens
      this.setState({ params }, callback);
      this.props.navigate({
        search: '?' + ParamHelper.getQueryString(params, ignoreParams || []),
      });
    };
  }

  // removes any params not in ignoredParams from params and calls updateParams with it
  static clearAllFilters({ params, ignoredParams, updateParams }: any) {
    const deleteKeys = Object.keys(
      ParamHelper.getReduced(params, ignoredParams),
    );

    for (const key of deleteKeys) {
      params = ParamHelper.deleteParam(params, key);
    }

    updateParams({ ...params, page: 1 });
  }

  // check if params are valid for sorting
  static validSortParams = (
    sort: string,
    sortParams: string,
    defaultSort: string,
  ) => {
    const isDesc = sort.includes('-');

    const ascSort = isDesc ? sort.replace('-', '') : sort;

    if (sortParams.includes(ascSort)) {
      return isDesc ? sort : ascSort;
    }

    return defaultSort;
  };
}
