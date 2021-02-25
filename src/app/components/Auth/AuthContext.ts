import { createContext, useContext } from 'react';
import { UserStore } from 'app/stores';

export const AuthContext = createContext<UserStore | null>(null);
export const useAuth = () => useContext(AuthContext);
