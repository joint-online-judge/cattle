import { createContext, useContext } from 'react';

export const authContext = createContext(undefined);
export const useAuth = () => useContext(authContext);
