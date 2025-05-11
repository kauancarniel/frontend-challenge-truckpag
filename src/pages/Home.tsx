import { useEffect, useState, useContext } from 'react';
import { requestData } from '../service/request.js';
import movieContext from '../context/movieContext';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header.js';
import SearchBar from '../components/SearchBar';

function Home() {
  const [apiData, setApiData] = useState();
  const { dataApi, setDataApi, setDefaultDataApi } = useContext(movieContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await requestData();
      setApiData(apiData);
      setDataApi(data)
      setDefaultDataApi(data);
      console.log(data);
    };

    fetchData()
  }, [])

  return (
    <div>
      <Header />
      <SearchBar />
      { dataApi.map((movie, key) => (
        <MovieCard movie={ movie } key={ key } />
      )) }
    </div>
  )
}

export default Home;