import React from 'react';
import { FeatureFlagsType } from 'src/api/response-types/feature-flags';
import { UserType } from 'src/api/user';

export interface IAppContextType {
  user?: UserType;
  setUser: (user: UserType) => void;
  featureFlags: FeatureFlagsType;
}

export const AppContext = React.createContext<IAppContextType>(undefined);
export const useContext = () => React.useContext(AppContext);
