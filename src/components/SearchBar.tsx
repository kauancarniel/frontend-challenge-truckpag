import { useEffect, useContext, useState } from 'react';
import movieContext from '../context/movieContext';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { dataApi, setDataApi, defaultDataApi } = useContext(movieContext);
  const [isChecked, setIsChecked] = useState(false);

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
      const filtered = dataApi.filter((m) => {
        m.title.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setDataApi(filtered);
    }

  }, [searchTerm]);
  
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input type='checkbox' onClick={() => setIsChecked(!isChecked)} />
    </div>
  );
}

export default SearchBar;
