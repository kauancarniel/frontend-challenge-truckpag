import { createContext } from 'react';
import type { UserContextValue } from '../interfaces/IUser';

const userContext = createContext<UserContextValue>({} as UserContextValue);

export default userContext;