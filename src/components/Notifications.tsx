import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
} from '@patternfly/react-core';
import React from 'react';
import { NotificationsContext } from './NotificationsContext';

export const Notifications: React.FunctionComponent = () => {
  const appContext = React.useContext(NotificationsContext);
  return (
    <AlertGroup isToast aria-live='polite'>
      {appContext.notifications.map((notification) => {
        return (
          <Alert
            title={notification.title}
            variant={notification.variant}
            key={notification.title}
            {...(!notification.hideCloseButton && {
              actionClose: (
                <AlertActionCloseButton
                  onClose={() => {
                    appContext.dismissNotification(notification.title);
                  }}
                />
              ),
            })}
            timeout={notification.timeout ? notification.timeout : 4000}
          >
            {notification.message}
          </Alert>
        );
      })}
    </AlertGroup>
  );
};
