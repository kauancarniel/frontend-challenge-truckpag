import { useEffect, useContext, useState, useMemo } from 'react';
import movieContext from '../context/movieContext';
import userContext from '../context/userContext';

function Filters() {
  const { setDataApi, defaultDataApi } = useContext(movieContext);
  const { favoriteIds, watchedIds, comments } = useContext(userContext);

  const [showFavs, setShowFavs] = useState(false);
  const [showWatched, setShowWatched] = useState(false);
  const [showCommented, setShowCommented] = useState(false);

  const commentedMovieIds = useMemo(() => comments.map(comment => comment.id), [comments]);

  useEffect(() => {
    if (!showFavs && !showWatched && !showCommented) {
      setDataApi(defaultDataApi);
      return;
    }

    const result = defaultDataApi.filter(movie => {
      const favs = !showFavs || favoriteIds.includes(movie.id);
      const wat = !showWatched || watchedIds.includes(movie.id);
      const com = !showCommented || commentedMovieIds.includes(movie.id);
      
      return favs && wat && com;
    });

    setDataApi(result);
  }, [showFavs, showWatched, showCommented, favoriteIds, watchedIds, commentedMovieIds, defaultDataApi, setDataApi]);

  return (
    <div className='flex flex-rpw justify-start gap-2 mt-2'>
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
    </div>
  );
}

export default Filters;