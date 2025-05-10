import React, { useContext } from 'react';
import movieContext from '../context/movieContext';
import userContext from '../context/userContext';

function MovieCard() {
  const movcontext = useContext(movieContext);
  const { favorite, setFavorite, watched, setWatched } = useContext(userContext)

  return (
    <>
      { movcontext.dataApi.map((movie, key) => (
        <div key={ key } className="movieCard">
          <img src={movie.movie_banner}/>
          <h2>{ movie.title }</h2>
          <p>{ movie.release_date }</p>
          <p>{ movie.running_time }</p>
          <p>{movie.description}</p>
          <p>{`diretor: ${movie.director} produtor: ${movie.producer}`}</p>
          <p>{ movie.rt_score }</p>
          <button onClick={() => setWatched(!watched) }>
            Mark Watched
          </button>
          <button onClick={() => setFavorite(!favorite) }>
            Add to Favorite
          </button>
        </div>
      )) }
    </>
  )
};

export default MovieCard;