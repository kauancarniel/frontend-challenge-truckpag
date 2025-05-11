import React, { useContext } from 'react';
import movieContext from '../context/movieContext';
import userContext from '../context/userContext';
import FormCommentary from './FormCommentary';
import './MovieCard.css';

function MovieCard() {
  const movcontext = useContext(movieContext);
  const { favoriteIds, setFavIds, watchedIds, setWatchedIds } = useContext(userContext)

  const addMovieToWatched = ({ id }) => {
    const checkWatched = watchedIds.some((m) => m === id)
    if (checkWatched) {
      const newWatched = watchedIds.filter((m) => m !== id)
      setWatchedIds(newWatched);
    }
    else if (!checkWatched) {
      setWatchedIds([...watchedIds, id])
    }
  };

  const addMovieToFav = ({ id }) => {
    const checkFav = favoriteIds.some((m) => m === id)
    if (checkFav) {
      const newFavs = favoriteIds.filter((m) => m !== id)
      setFavIds(newFavs);
    }
    else if (!checkFav) {
      setFavIds([...favoriteIds, id])
    }
  };

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
          <button onClick={ () => addMovieToWatched(movie) }
            className={ watchedIds.some(id => id === movie.id) ? "redBtn" : "greenBtn" }
          >
            Mark Watched
          </button>
          <button onClick={() => addMovieToFav(movie) }
          className={ favoriteIds.some(id => id === movie.id) ? "redBtn" : "greenBtn" }
            >
            Add to Favorite
          </button>
          <FormCommentary />
        </div>
      )) }
    </>
  )
};

export default MovieCard;