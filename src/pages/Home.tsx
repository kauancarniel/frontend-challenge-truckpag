import { useEffect, useState, useContext } from 'react';
import { requestData } from '../service/request.js';
import movieContext from '../context/movieContext';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header.js';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters.js';
import { ToastContainer } from 'react-toastify';

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
      <Filters />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-4 p-4'>
      { dataApi.map((movie, key) => (
        <MovieCard movie={ movie } key={ key } />
      )) }
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
      </div>
    </div>
  )
}

export default Home;