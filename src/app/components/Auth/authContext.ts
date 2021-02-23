import { createContext, useContext } from 'react';
import { UserStore } from 'app/stores';

export const authContext = createContext<UserStore | null>(null);
export const useAuth = () => useContext(authContext);
