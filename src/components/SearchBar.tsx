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
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input type='checkbox' onClick={() => setIsChecked(!isChecked)} />
      <label htmlFor="checkbox">Include synopsis in search</label>
      <select 
          className='bg-black' 
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
  );
}

export default SearchBar;
