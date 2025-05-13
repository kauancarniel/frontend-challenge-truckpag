import { useContext, useState } from 'react';
import userContext from '../context/userContext';
import FormCommentary from './FormCommentary';
import type { IMovie } from '../interfaces/IMovie';
import { toast } from 'react-toastify';

function MovieCard({ movie }: { movie: IMovie }) {
  const { favoriteIds, setFavIds, watchedIds, setWatchedIds } = useContext(userContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const addMovieToWatched = ({ id }: { id: string }) => {
    const checkWatched = watchedIds.some((m) => m === id);
    if (checkWatched) {
      setWatchedIds(watchedIds.filter((m) => m !== id));
      toast("Removed from Watched");
    } else {
      setWatchedIds([...watchedIds, id]);
      toast("Added to Watched");
    }
  };

  const addMovieToFav = ({ id }: { id: string }) => {
    const checkFav = favoriteIds.some((m) => m === id);
    if (checkFav) {
      setFavIds(favoriteIds.filter((m) => m !== id));
      toast("Removed from Favorites");
    } else {
      setFavIds([...favoriteIds, id]);
      toast("Added from Favorites");
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative aspect-[3/4]">
        <img
          src={movie.image}
          className="w-full h-full object-cover"
          alt={movie.title}
        />
        <div className="absolute top-0.5 right-0.5 flex space-x-0.5">
            <button
              onClick={() => addMovieToWatched(movie)}
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                watchedIds.some(id => id === movie.id) ? "text-green-500" : "text-white"
              }`}
            >
              👁
            </button>
          <button
            onClick={() => {addMovieToFav(movie);}}
            className={`px-3 py-1 rounded-full text-sm font-bold ${
              favoriteIds.some(id => id === movie.id) ? "text-red-500" : "text-white"
            }`}
          >
            ♥
          </button>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <h2 className="text-xl font-bold text-white mb-2">{movie.title}</h2>
        
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{movie.release_date}</span>
          <span>{movie.running_time} min</span>
        </div>

        <div className="mb-3 bg-transparent text-white text-xs px-1 py-0.5 border-none shadow-none">
          <p className={`text-sm text-gray-300 ${!isExpanded && "line-clamp-3"}`}>
            {movie.description}
          </p>
          {movie.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white-400 bg text-xs mt-1 "
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
        
        <div className="text-xs text-gray-400 mb-1">
          <p><span className="font-semibold mr-2">Director:</span> {movie.director}</p>
          <p><span className="font-semibold mr-2">Producer:</span> {movie.producer}</p>
          <p><span className="font-semibold mr-2">Score:</span>{movie.rt_score}%</p>
        </div>

        <FormCommentary id={movie.id} />
      </div>
    </div>
  );
};

export default MovieCard;