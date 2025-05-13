import { useEffect, useContext, useState } from 'react';
import movieContext from '../context/movieContext';
import userContext from '../context/userContext';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isChecked, setIsChecked] = useState(false); 
  const [orderBy, setOrderBy] = useState("default");
  const { dataApi, setDataApi, defaultDataApi } = useContext(movieContext);
  const { comments } = useContext(userContext);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setDataApi(defaultDataApi);
    }
  
    else if (isChecked) {
      const filtered = dataApi.filter((m) => 
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setDataApi(filtered);
    }
    else if (!isChecked) {
      const filtered = dataApi.filter((m) => 
        m.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setDataApi(filtered);
    }
  }, [searchTerm]);

  useEffect(() => {
    switch (orderBy) {
      case "TitleAZ":
        setDataApi([...dataApi].sort((a, b) => a.title.localeCompare(b.title)));
        break;
        
      case "TitleZA":
        setDataApi([...dataApi].sort((a, b) => b.title.localeCompare(a.title)));
        break;
        
      case "DurationS":
        setDataApi([...dataApi].sort((a, b) => parseInt(a.running_time) - parseInt(b.running_time)));
        break;
        
      case "DurationL":
        setDataApi([...dataApi].sort((a, b) => parseInt(b.running_time) - parseInt(a.running_time)));
        break;

      case "Your RatingH":
        const sortedCommentsH = [...comments].sort((a, b) => b.rating - a.rating);
        const RatingH = new Map();
        sortedCommentsH.forEach((comment, index) => {
          RatingH.set(comment.id, index);
        });

        const ratedH = dataApi.filter(m => RatingH.has(m.id)).sort((a, b) => RatingH.get(a.id) - RatingH.get(b.id));
        const notRatedH = dataApi.filter(m => !RatingH.has(m.id));

        const filteredL = [...ratedH, ...notRatedH];

        setDataApi(filteredL);
        break;

      case "Your RatingL":
        const sortedCommentsL = [...comments].sort((a, b) => a.rating - b.rating);
        const RatingL = new Map();
        sortedCommentsL.forEach((comment, index) => {
          RatingL.set(comment.id, index);
        });

        const ratedL = dataApi.filter(m => RatingL.has(m.id)).sort((a, b) => RatingL.get(a.id) - RatingL.get(b.id));
        const notRatedL = dataApi.filter(m => !RatingL.has(m.id));

        const filteredH = [...ratedL, ...notRatedL];

        setDataApi(filteredH);
        break;

      case "RatingH":
        setDataApi([...dataApi].sort((a, b) => parseInt(b.rt_score) - parseInt(a.rt_score)));
        break;

      case "RatingL": 
        setDataApi([...dataApi].sort((a, b) => parseInt(a.rt_score) - parseInt(b.rt_score)));
        break;

      default:
        setDataApi(defaultDataApi);
}

  }, [orderBy]);
  
  return (
    <div className="search-bar">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="h-4 w-4 text-muted-foreground"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2
          text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm
          file:font-medium placeholder:text-muted-foreground focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-10"
      />
    </div>
      <div className='flex flex-row justify-between items-center gap-2 ml-1 w-full'>
        <div className='flex flex-row gap-2'>
          <input
            type='checkbox'
            onClick={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="checkbox">Include synopsis in search</label>
        </div>
      <div className='flex flex-row gap-2'>
      <p className='mt-1'>Order By:</p>
      <select 
        className='bg-gray-900 text-gray-100 text-sm rounded-md px-3 py-1.5 border border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            hover:border-gray-600 transition-colors cursor-pointer' 
        value={orderBy}
        onChange={({ target }) => setOrderBy(target.value) }
      >
        <option value="Default">Default</option>
        <option value="TitleAZ">Title (A-Z)</option>
        <option value="TitleZA">Title (Z-A)</option>
        <option value="DurationS">Duration (Shortest)</option>
        <option value="DurationL">Duration (Longest)</option>
        <option value="Your RatingH">Your Rating (Highest)</option>
        <option value="Your RatingL">Your Rating (Lowest)</option>
        <option value="RatingH">Rating (Highest)</option>
        <option value="RatingL">Rating (Lowest)</option>
      </select>
      </div>
      </div>
    </div>
  );
}

export default SearchBar;
