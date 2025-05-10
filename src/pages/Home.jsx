import React, { useEffect, useState, useContext } from 'react';
import { requestData } from '../service/request';
import movieContext from '../context/movieContext';

function Home() {
  const [apiData, setApiData] = useState();
  const context = useContext(movieContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await requestData();
      setApiData(data);
      context.serDataApi(data)
    };

    fetchData()
  }, [])

  return (
    <div>
      { apiData?.map((item, key) => <p key={key}>{item.title}</p>) }
    </div>
  )
}

export default Home;