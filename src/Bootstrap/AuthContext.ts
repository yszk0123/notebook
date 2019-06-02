import React, { useContext } from 'react';
import { noop } from '../application/utils/noop';

export type AuthController = {
  logout: () => void;
};

const defaultAuth: AuthController = {
  logout: noop,
};

const AuthContext = React.createContext(defaultAuth);

export const AuthProvider = AuthContext.Provider;

export function useAuth(): AuthController {
  return useContext(AuthContext);
}
