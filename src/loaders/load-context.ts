import { ActiveUserAPI } from 'src/api/active-user';
import { FeatureFlagsAPI } from 'src/api/feature-flags';
import { FeatureFlagsType } from 'src/api/response-types/feature-flags';
import { UserType } from 'src/api/user';

type ContextFragment = {
  user?: UserType;
  featureFlags: FeatureFlagsType;
};

export function loadContext(): Promise<ContextFragment> {
  const getFeatureFlags = FeatureFlagsAPI.get().then(
    ({ data: featureFlags }) => ({
      alerts: (featureFlags._messages || []).map((msg) => ({
        variant: 'warning',
        title: msg.split(':')[1],
      })),
      featureFlags,
    }),
  );

  return Promise.all([ActiveUserAPI.getUser(), getFeatureFlags])
    .then(([user, { alerts, featureFlags }]) => ({
      user,
    }))
    .catch(() => {
      // we need this even if ActiveUserAPI fails, otherwise isExternalAuth will always be false, breaking keycloak redirect
      return getFeatureFlags.then(({ alerts, featureFlags }) => ({
        alerts,
        featureFlags,
      }));
    });
}
