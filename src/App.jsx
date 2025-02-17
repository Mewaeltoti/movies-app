/* eslint-disable no-undef, react/prop-types, class-methods-use-this , no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import Search from './component/Search'
import Spinner from './component/Spinner';
import MovieCard from './component/MovieCard';
import {useDebounce} from 'react-use'
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const[trendingMovies,setTrendingMovies] = useState([]);
  const[debounceSearchTerm, setDebounceSearchTerm] = useState('');
  useDebounce(()=>setDebounceSearchTerm(searchTerm),500,[searchTerm])

  const fetchMovies = async (query='') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
      : `${API_BASE_URL}/discover/movie?sort_by=popularity_desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to Fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      if(query && data.results.length>0){
        await updateSearchCount(query,data.results[0]);
        ;
      }

    } catch (error) {
      console.error(`Error fetching movies:${error}`);
      setErrorMessage('Error fetching movies. please try again later.');
    }
    finally {
      setIsLoading(false);
    }
  }
  const loadTrendingMovies = async ()=>{
    try{
      const movies= await getTrendingMovies();
      setTrendingMovies(movies);
    }
    catch (error){
console.error(`Error fetching trending movies: ${error}`)
    }
  }
  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);
  useEffect(()=>{
    loadTrendingMovies();
  },[])
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img className='logo' src='/logo.png' alt='logo' />
          <img src="/hero.png" alt='hero' />
          <h1>Find <span className='text-gradient'>Movies</span> You&#39;ll Enjoy Without the Hassle</h1>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending</h2>
              <ul>
                {trendingMovies.map((movie, index) => (
                    <li key={movie.$id}> {/* Ensure you're using the movie ID here */}
                      <p>{index + 1}</p>
                      <img
                          src={movie.poster_url}
                          alt={movie.title}
                      />
                    </li>
                ))}
              </ul>
            </section>
        )}

        <section className='all-movies'>
          <h2 >All Movies</h2>
          {isLoading ? (<Spinner/>
          ) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>)
              : (
              <ul>
            {movieList
                .filter(movie => movie.poster_path)
                .map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>

            ))}

          </ul>)}
        </section>
      </div>

    </main>
  )
}

export default App
