import { Constants } from 'src/constants';
import { HubAPI } from './hub';
import { UserType } from './response-types/user';

class API extends HubAPI {
  apiPath = this.getUIPath('me/');

  getUser(): Promise<UserType> {
    return this.http.get(this.apiPath).then((result: any) => result.data);
  }

  saveUser(data: any) {
    return this.http.put(this.apiPath, data);
  }

  // insights has some asinine way of loading tokens that involves forcing the
  // page to refresh before loading the token that can't be done with a single
  // API request.
  getToken(): Promise<{ data: { token: string } }> {
    if (DEPLOYMENT_MODE === Constants.INSIGHTS_DEPLOYMENT_MODE) {
      return Promise.reject(
        'Use window.insights.chrome.auth to get tokens for insights deployments',
      );
    }

    return this.http.post('v3/auth/token/', {});
  }

  // Note: This does not reset the app's authentication state. That has to be done
  // separately by setting the user state in the app's root component
  logout() {
    return this.http.post(this.getUIPath('auth/logout/'), {});
  }

  // Note: This does not reset the app's authentication state. That has to be done
  // separately by setting the user state in the app's root component
  login(username: string, password: string) {
    const loginURL = this.getUIPath('auth/login/');

    // Make a get request to the login endpoint to set CSRF tokens before making
    // the authentication reqest
    return this.http.get(loginURL).then(() =>
      this.http.post(loginURL, {
        username,
        password,
      }),
    );
  }
}

export const ActiveUserAPI = new API();
