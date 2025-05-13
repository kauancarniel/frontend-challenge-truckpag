import { createContext } from 'react';
import type { MovieContextValue } from '../interfaces/IMovie';

const MovieContext = createContext<MovieContextValue>({} as MovieContextValue);

export default MovieContext;