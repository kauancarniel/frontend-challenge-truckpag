import React, { useState } from 'react';
import movieContext from './movieContext';
import PropTypes from 'prop-types';

function MovieProvider({ children }) {
  const [dataApi, serDataApi] = useState([]);

  return (
    <movieContext.Provider value={{ dataApi, serDataApi }}>
      {children}
    </movieContext.Provider>
  );
}

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default MovieProvider;