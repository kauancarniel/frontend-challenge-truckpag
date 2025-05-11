import { useEffect, useMemo, useState } from 'react';
import userContext from './userContext';
import { type IComment, type UserProviderProps } from '../interfaces/IUser';

function UserProvider({ children }: UserProviderProps) {
  const [favoriteIds, setFavIds] = useState<string[]>(JSON.parse(localStorage.getItem('favoriteIds') as string ) || []);
  const [watchedIds, setWatchedIds] = useState<string[]>(JSON.parse(localStorage.getItem('watchedIds') as string ) || []);
  const [comments, setComments] = useState<IComment[]>([])

  useEffect(() => {
    localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    localStorage.setItem('watchedIds', JSON.stringify(watchedIds));
  }, [watchedIds]);

  const userInfos = useMemo(() => ({
    watchedIds,
    setWatchedIds,
    favoriteIds,
    setFavIds,
    comments,
    setComments
  }), [watchedIds, favoriteIds, comments]);

  return (
    <userContext.Provider value={ userInfos }>
      {children}
    </userContext.Provider>
  );
}


export default UserProvider;