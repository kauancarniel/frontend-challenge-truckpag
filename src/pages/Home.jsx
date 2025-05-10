import React, { useEffect, useState, useContext } from 'react';
import { requestData } from '../service/request';
import movieContext from '../context/movieContext';
import MovieCard from '../components/movieCard';

function Home() {
  const [apiData, setApiData] = useState();
  const context = useContext(movieContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await requestData();
      setApiData(data);
      context.serDataApi(data)
      console.log(data);
    };

    fetchData()
  }, [])

  return (
    <div>
      <MovieCard />
    </div>
  )
}

export default Home;