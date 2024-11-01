import { useEffect, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import MovieRow from "./MovieRow";
import {
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchtopRatedMovies,
} from "../utils/api";
import { useDispatch } from "react-redux";
import { setPlayingMovies } from "../utils/movieSlice";

const Browse = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setnowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadMovies = async () => {
      const popular = await fetchPopularMovies();
      const nowPlayingMovies = await fetchNowPlayingMovies();
      const topRatedMovies = await fetchtopRatedMovies();
      const upcomingMovies = await fetchUpcomingMovies();

      dispatch(setPlayingMovies(popular.results));

      setPopularMovies(popular.results);
      setnowPlayingMovies(nowPlayingMovies.results);
      setTopRatedMovies(topRatedMovies.results);
      setUpcomingMovies(upcomingMovies.results);

      const randomIndex = Math.floor(Math.random() * Math.min(20, popular.results.length));

      setMainMovie(popular.results[randomIndex]);      
    };

    loadMovies();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Header />
      {mainMovie && <Hero mainMovie={mainMovie} />}

      <div className="px-12 -mt-49 relative">
        <MovieRow title="Popular on Netflix" movies={popularMovies} />
        <MovieRow title="NowPlaying Movies" movies={nowPlayingMovies} />
        <MovieRow title="TopRated Movies" movies={topRatedMovies} />
        <MovieRow title="Upcoming Movies" movies={upcomingMovies} />
      </div>
    </div>
  );
};

export default Browse;
