import {
  options,
  popular,
  nowPlaying,
  top_rated,
  upcoming,
} from "./constents";

interface Video {
  type: string;
}

export const fetchPopularMovies = async () => {
  const data = await fetch(popular, options);
  return data.json();
};

export const fetchNowPlayingMovies = async () => {
  const data = await fetch(nowPlaying, options);
  return data.json();
};

export const fetchtopRatedMovies = async () => {
  const data = await fetch(top_rated, options);
  return data.json();
};

export const fetchUpcomingMovies = async () => {
  const data = await fetch(upcoming, options);
  return data.json();
};

export const fetchMovieVideos = async (id:number) => {
  const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
  const json = await data.json();

  const filterData = json.results.filter(
    (video: Video) => video.type === "Trailer"
  );
  const trailer = filterData.length ? filterData[0] : json.results[0];
  return trailer;
};
