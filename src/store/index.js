import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import promiseMiddleware from 'redux-promise-middleware';

let registry;

export function init(...middleware) {
  if (!registry) {
    registry = getRegistry({}, [
      promiseMiddleware,
      notificationsMiddleware({ errorDescriptionKey: ['detail', 'stack'] }),
      ...middleware,
    ]);
  }
  return registry;
}

export function getStore() {
  return registry.getStore();
}

export function register(...args) {
  return registry.register(...args);
}
