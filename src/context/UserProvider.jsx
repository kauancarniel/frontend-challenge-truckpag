import React, { use, useMemo, useState } from 'react';
import userContext from './userContext';
import PropTypes from 'prop-types';

function UserProvider({ children }) {
  const [favoriteIds, setFavIds] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [watched, setWatched] = useState(false);


  const userInfos = useMemo(() => ({
    favorite,
    setFavorite,
    watched,
    setWatched,
    favoriteIds,
    setFavIds,
  }), [favorite, watched, favoriteIds]);

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