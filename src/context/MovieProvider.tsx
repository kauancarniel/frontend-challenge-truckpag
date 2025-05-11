import React, { useState } from 'react';
import type { IMovie, MovieProviderProps } from '../interfaces/IMovie';
import MovieContext from './movieContext';

const MovieProvider = ({ children }: MovieProviderProps) => {
  const [dataApi, setDataApi] = useState<IMovie[]>([]);
  const [defaultDataApi, setDefaultDataApi] = useState<IMovie[]>([]);

  const value = { dataApi, setDataApi, defaultDataApi, setDefaultDataApi };
  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};


export default MovieProvider;