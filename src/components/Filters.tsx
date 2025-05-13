import { useEffect, useContext, useState, useMemo } from 'react';
import movieContext from '../context/movieContext';
import userContext from '../context/userContext';

function Filters() {
  const { setDataApi, defaultDataApi } = useContext(movieContext);
  const { favoriteIds, watchedIds, comments } = useContext(userContext);

  const [showFavs, setShowFavs] = useState(false);
  const [showWatched, setShowWatched] = useState(false);
  const [showCommented, setShowCommented] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("allMovie");

  const { commentedMovieIds, movieRatings } = useMemo(() => {
    const commentedIds = comments.map(comment => comment.id);
    const ratingsMap = new Map();
      comments.forEach(comment => {
      if (comment.rating) {
      ratingsMap.set(comment.id, comment.rating);
      }
    });

    return {
      commentedMovieIds: commentedIds,
      movieRatings: ratingsMap
    };
  }, [comments]);

  useEffect(() => {
    if (!showFavs && !showWatched && !showCommented && ratingFilter === "allMovie") {
      setDataApi(defaultDataApi);
      return;
    }

    const result = defaultDataApi.filter(movie => {
      const passesFavs = !showFavs || favoriteIds.includes(movie.id);
      const passesWatched = !showWatched || watchedIds.includes(movie.id);
      const passesCommented = !showCommented || commentedMovieIds.includes(movie.id);
      
      var passesRating = true;
      const movieRating = movieRatings.get(movie.id);
      
      switch (ratingFilter) {
        case "anyRating":
          passesRating = movieRating !== undefined;
          break;
        case "unrated":
          passesRating = movieRating === undefined;
          break;
        case "5star":
          passesRating = movieRating === 5;
          break;
        case "4star":
          passesRating = movieRating === 4;
          break;
        case "3star":
          passesRating = movieRating === 3;
          break;
        case "2star":
          passesRating = movieRating === 2;
          break;
        case "1star":
          passesRating = movieRating === 1;
          break;
      }
      
      return passesFavs && passesWatched && passesCommented && passesRating;
    });

    setDataApi(result);
  }, [
    showFavs, showWatched, showCommented, ratingFilter,
    favoriteIds, watchedIds, commentedMovieIds, movieRatings,
    defaultDataApi, setDataApi
  ]);

  return (
    <div className='flex flex-row justify-start gap-2 mt-2'>
      <p className='mt-2'>Filters:</p>
      <button 
        onClick={() => setShowWatched(!showWatched)} 
        className={showWatched ? "greenBtn" : "bg-gray-900"}
      >
        Watched
      </button>
      <button 
        onClick={() => setShowFavs(!showFavs)} 
        className={showFavs ? "greenBtn" : "bg-gray-900"}
      >
        Favorites
      </button>
      <button 
        onClick={() => setShowCommented(!showCommented)} 
        className={showCommented ? "greenBtn" : "bg-gray-900"}
      >
        With Comments
      </button>
      <select 
        className='bg-gray-900 text-gray-100 text-sm rounded-md px-3 py-1.5 border border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            hover:border-gray-600 transition-colors cursor-pointer'
        value={ratingFilter}
        onChange={({ target }) => setRatingFilter(target.value)}
      >
        <option value="allMovie">All Movies</option>
        <option value="anyRating">Any Rating ★</option>
        <option value="unrated">Unrated</option>
        <option value="5star">5 Stars ★★★★★</option>
        <option value="4star">4 Stars ★★★★</option>
        <option value="3star">3 Stars ★★★</option>
        <option value="2star">2 Stars ★★</option>
        <option value="1star">1 Star ★</option>
      </select>
    </div>
  );
}

export default Filters;