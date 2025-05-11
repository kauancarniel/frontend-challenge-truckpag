import React, { useEffect, useMemo, useState } from 'react';
import userContext from './userContext';
import PropTypes from 'prop-types';

function UserProvider({ children }) {
  const [favoriteIds, setFavIds] = useState(JSON.parse(localStorage.getItem('favoriteIds')) || []);
  const [watchedIds, setWatchedIds] = useState(JSON.parse(localStorage.getItem('watchedIds')) || []);
  const [comments, setComments] = useState([])

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

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default UserProvider;